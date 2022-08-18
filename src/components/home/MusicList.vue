<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemMUsic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { getMusicList } from "@/request/api/home";
import { onMounted, reactive } from "vue";

const state = reactive({
  musicList: [],
});
//播放数处理
function changeCount(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  }
}
onMounted(async () => {
  let res = await getMusicList();
  state.musicList = res.result;
});
</script>

<style scoped lang="less">
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;
    .van-swipe-item {
      padding-right: 0.2rem;
      position: relative;
      height: 3.6rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        // line-height: 25px;//设置字体居中
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          // vertical-align: middle;//设置图标对齐字体
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
        height: 1.2rem;
        display: inline-block;
        overflow: hidden;
      }
    }
  }
}
</style>
