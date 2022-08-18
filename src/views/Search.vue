<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="陈奕迅"
      v-model="keyword"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span
      v-for="item in keyWorldList"
      :key="item"
      class="spankey"
      @click="searchHistory(item)"
      >{{ item }}</span
    >
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="pushMusic(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <div v-show="!searchList">未找到与“{{ keycode }}”相关内容</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSearchMusic } from "@/request/api/home";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    //用ref定义好清空数组和对象，reactive要将数组长度置为0或遍历delect obj[]属性
    let keyWorldList = ref(
      JSON.parse(localStorage.getItem("keyWorldList")) || []
    );
    let searchList = ref([]);
    let keyword = ref("");
    let keycode = ref("");
    //如果定义是置空则为undefined，所以下面判断条件可能出现null情况，就要用keyword.value判断
    async function enterKey() {
      if (!/^ [\s]*$/.test(keyword.value) && keyword.value != "") {
        keyWorldList.value.unshift(keyword.value);
        //去重
        keyWorldList.value = [...new Set(keyWorldList.value)];
        //限制长度
        if (keyWorldList.value.length > 5) {
          keyWorldList.value.pop();
        }
        localStorage.setItem(
          "keyWorldList",
          JSON.stringify(keyWorldList.value)
        );
        //根据keyword获取搜索记录
        let res = await getSearchMusic(keyword.value);
        searchList.value = res.result.songs;
        if (!res.result.songs) {
          keycode.value = keyword.value;
        }
      }
      keyword.value = "";
    }
    //点击历史获取搜索记录
    async function searchHistory(item) {
      let res = await getSearchMusic(item);
      searchList.value = res.result.songs;
      if (!searchList.value) {
        keycode.value = item;
      }
    }
    //删除历史记录
    function delHistory() {
      localStorage.removeItem("keyWorldList");
      keyWorldList.value = [];
    }
    //歌曲添加歌单
    function pushMusic(item) {
      //统一歌单歌曲属性
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      item.ar = item.artists;
      store.commit("pushplayList", item);
      store.commit("updatePlayListIndex", store.state.playList.length - 1);
    }
    return {
      keyWorldList,
      keyword,
      keycode,
      searchList,
      searchHistory,
      enterKey,
      delHistory,
      pushMusic,
    };
  },
};
</script>

<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spankey {
    display: inline-block;
    max-width: 1.4rem;
    background-color: #999;
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.1rem;
    white-space: nowrap;//解决文字不隐藏
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle; //设置行内块的对齐方式,[注意文字存在行高]
  }
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
