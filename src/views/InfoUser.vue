<template>
  <div>
    <svg
      class="icon"
      aria-hidden="true"
      @click="$router.push({ name: 'home' })"
    >
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
  </div>
  <div class="infoUserTop">
    <img :src="user.profile.avatarUrl" alt="" class="profileimg" />
    <div class="name">{{ user.profile.nickname }}</div>
  </div>
  <div class="button">
    <van-button round block type="danger" @click="exit"> 退出登录 </van-button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "",
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(
      () => JSON.parse(localStorage.getItem("user")) || store.state.user
    );
    function exit() {
      store.commit("updateisLogin", false);
      store.commit("clearToken");
      store.commit("clearuser");
      router.push({ name: "home" });
    }
    return {
      user,
      exit,
    };
  },
};
</script>
<style scoped lang="less">
.infoUserTop {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profileimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .name {
    font-weight: 700;
    font-size: 20px;
  }
}
.button {
  width: 1.76rem;
  height: 0.88rem;
  margin: 0 auto;
}
</style>
