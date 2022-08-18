<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换上下首噢</span>
      </div>
    </div>
    <div class="footerRight">
      <!-- 播放暂停图标切换显示 -->
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      @timeupdate="timeUpdate"
      @durationchange="durationUpdate"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      ><MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, watch } from "vue";
import { getMapstate } from "@/hooks/getMapstate";
import { mapMutations, useStore } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  components: {
    MusicDetail,
  },
  setup() {
    const store = useStore();
    // computed通过getter和setter对value进行数据劫持封装为ref对象实现响应式
    // const playlist = computed(() => store.state.playList);
    const storeState = getMapstate([
      "playList",
      "playListIndex",
      "isbtnShow",
      "detailShow",
    ]);
    const audio = ref(null);
    //判断是否播放
    function play() {
      if (audio.value.paused) {
        audio.value.play(); //必须要在用户交互才有用
        store.commit("updateIsbtnShow", false);
      } else {
        audio.value.pause();
        store.commit("updateIsbtnShow", true);
      }
    }
    //底层渲染和数据更新时获取歌词信息
    onMounted(() => {
      store.dispatch(
        "getLyric",
        storeState.playList.value[storeState.playListIndex.value].id
      );
    });  
    onUpdated(() => {
      store.dispatch(
        "getLyric",
        storeState.playList.value[storeState.playListIndex.value].id
      );
    });
    
    //监视歌单和歌曲下标变化，自动播放音乐
    watch(storeState.playList, () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        store.commit("updateIsbtnShow", false);
      }
    });
    watch(storeState.playListIndex, () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        store.commit("updateIsbtnShow", false);
      }
    });
    //获取当前歌曲当前播放时间
    function timeUpdate() {
      store.commit("updateCurrentTime", audio.value.currentTime);
    }
    //获取当前歌曲总时长
    function durationUpdate(){
      store.commit("updateDuration", audio.value.duration);
    }
    return {
      ...storeState,
      ...mapMutations(["updateDetailShow"]),
      audio,
      play,
      timeUpdate,
      durationUpdate
    };
  },
  components: { MusicDetail },
};
</script>

<style scoped lang="less">
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
