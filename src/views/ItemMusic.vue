<template>
  <itemMusicTop :playlist="state.playlist"></itemMusicTop>
  <itemMusicList
    :itemList="state.itemList"
    :subscribedCount="state.playlist.subscribedCount"
  ></itemMusicList>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { getMusicItemList, getItemList} from "@/request/api/item";
import itemMusicTop from "@/components/item/itemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";
const state = reactive({
  playlist: { creator: {} }, //歌单详情页
  itemList: [], //歌单列表
});
// let flag = ref(false);
onMounted(async () => {
  let id = useRoute().query.id;
  //获取歌单详情页
  let res = await getMusicItemList(id);
  state.playlist = res.playlist;
  // flag.value = true;
  //获取歌单
  let result = await getItemList(id);
  state.itemList = result.songs;
});
</script>

<style scoped lang="less"></style>
