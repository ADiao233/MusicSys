<template>
  <div class="login-container">
    <div class="top">登录</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div class="button">
        <van-button round block type="danger" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getLoginUser } from "@/request/api/home";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const phone = ref("");
    const password = ref("");
    const onSubmit = async (value) =>{
      // let res = await store.dispatch("getPhoneLogin", value);
      //模拟数据
      let res = {};
      res.code = 200;
      res.token = "123";
      res.account = {};
      res.account.id = 32953014;

      if (res.code === 200) {
        //如果返回code为200，则登录成功跳转页面
        store.commit("updateisLogin",true); 
        store.commit("updateToken", res.token);
        let result = await getLoginUser(res.account.id);
        store.commit("updateuser", result);
        router.push({ name: "InfoUser" });
      } else {
        alert("手机号码或者密码错误");
        password.value = "";
      }
    };

    return {
      phone,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  /* background-color: red; */
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  margin-top: 100px;
  .top {
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-size: 0.6rem;
  }
  .button {
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
