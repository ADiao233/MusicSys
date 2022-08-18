<template>
  <TopNav></TopNav>
  <SwpierTop></SwpierTop>
  <iconList></iconList>
  <MusicList></MusicList>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import iconList from "@/components/home/iconList.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "HomeView",
  components: {
    TopNav,
    SwpierTop,
    iconList,
    MusicList
  },
};
</script>
