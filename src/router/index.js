import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/itemMusic",
    name: "ItemMusic",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ItemMusic" */ "../views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ItemMusic" */ "../views/Search.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/infoUser",
    name: "InfoUser",
    //设置二次免登录
    beforeEnter(to, from) {
      if (
        store.state.isLogin ||
        localStorage.getItem("token") ||
        store.state.token
      ) {
        return 
      } else {
        return { name: "Login" };
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "InfoUser" */ "../views/InfoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//配置全局路由守卫，在登录页面不显示底部播放组件
router.beforeEach((to, from) => {
  if (to.name == "Login") {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
});
export default router;
