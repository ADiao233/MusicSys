<template>
  <router-view />
  <FooterMusic v-show="$store.state.isFooterMusic"></FooterMusic>
</template>
<script setup>
import FooterMusic from "./components/item/FooterMusic.vue";
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; //设置怪异盒子，内边距不会撑开盒子
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
}
</style>
