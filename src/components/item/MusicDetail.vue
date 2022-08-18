<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicList.al.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      :src="require('@/assets/needle-ab.png')"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img :src="require('@/assets/cd.png')" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      :class="isbtnShow ? 'img_ar_pauesd' : 'img_ar_active'"
      @click="isLyricShow = !isLyricShow"
    />
  </div>
  <div
    class="musicLyric"
    ref="musicLyric"
    v-show="isLyricShow"
    @click="isLyricShow = !isLyricShow"
  >
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          $store.state.currentTime * 1000 >= item.time &&
          $store.state.currentTime * 1000 <= item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input
        type="range"
        class="range"
        min="0"
        :max="$store.state.duration"
        v-model="$store.state.currentTime"
        step="0.05"
      />
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
//歌词和磁盘的切换显示
let isLyricShow = ref(false);
const props = defineProps(["musicList", "play", "isbtnShow"]);
const store = useStore();
const musicLyric = ref(null);
//返回按钮
function backHome() {
  store.commit("updateDetailShow");
}
//歌词数据处理
const lyric = computed(() => {
  let arr;
  if (store.state.lyricList.lyric) {
    arr = store.state.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      let min = item.slice(1, 3);
      let sec = item.slice(4, 6);
      let mill = item.slice(7, 10);
      let lrc = item.slice(11, item.length);
      let time =
        parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9);
        lrc = item.slice(10, item.length);
        time =
          parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
      }
      return { min, sec, mill, lrc, time };
    });
    //歌词时间处理
    arr.forEach((item, i) => {
      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
        item.pre = 1000000;
      } else {
        item.pre = arr[i + 1].time;
      }
    });
    return arr;
  }
});
//实现上下首音乐切换，根据updatePlayListIndex
function goPlay(value) {
  let index = store.state.playListIndex + value;
  // store.state.playListIndex=store.state.playListIndex+value
  if (index < 0) {
    index = store.state.playList.length - 1;
  } else if (index == store.state.playList.length) {
    index = 0;
  }
  store.commit("updatePlayListIndex", index);
}
//歌词轮播
watch(
  () => store.state.currentTime,
  (n, o) => {
    let p = document.querySelector("p.active");
    // console.log([p]);
    //最后一句为空，可能拿不到P
    if (p && p.offsetTop > 300) {
      musicLyric.value.scrollTop = p.offsetTop - 300; //当高亮p元素的顶部距离大于300时，设置滚动距离为多出300的大小
    }
    //当歌曲结束时跳下一首 
    if (n === store.state.duration) {
      if (store.state.playListIndex === store.state.playList.length - 1) {
        store.commit("updatePlayListIndex", 0);
        props.play();
      } else {
        store.commit("updatePlayListIndex", store.state.playListIndex + 1);
      }
    }
  }
);
</script>

<style scoped lang="less">
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0; //原点
    transform: rotate(-13deg); //逆时针13°
    transition: all 2s;
  }
  //动态添加class类添加动画
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.6rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234); //设置SVG颜颜色
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
