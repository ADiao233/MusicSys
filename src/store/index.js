import { createStore } from "vuex";
import { getMusicLyric } from "@/request/api/item";
import { getPhoneLogin } from "@/request/api/home";
export default createStore({
  state() {
    return {
      //播放列表
      playList: [
        {
          al: {
            id: 35196810,
            name: "Alone (Remixes)",
            pic: 109951165981275860,
            picUrl:
              "https://p2.music.126.net/vIw2lWpoRTQUVyfHprU5Kw==/109951165981275857.jpg",
            pic_str: "109951165981275857",
          },
          id: 462895823,
          ar: [
            {
              name: "Alone",
            },
          ],
          name: "Alone",
        },
      ],
      playListIndex: 0, //默认下标为0
      isbtnShow: true, //播放按钮显示
      detailShow: false, //歌曲详情页显示
      lyricList: {}, //歌词
      currentTime: 0, //当前歌曲进度时长
      duration: 0, //歌曲总时长
      isLogin: false, //判断是否登录
      isFooterMusic: true, //是否显示底部组件
      token: "",//token
      user: {}, //用户信息
    };
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    updatePlayList(state, value) {
      //每次提交后歌单都会重新生成，不建议
      // state.playListlet = value.map((element) => {
      //   return { al: element.al, id: element.id };
      // });
      //只有歌单不同时更改歌单
      if (state.playList != value) {
        state.playList = value;
      }
    },
    pushplayList(state, value) {
      state.playList.push(value);
    },
    updatePlayListIndex(state, index) {
      state.playListIndex = index;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyric(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    updateisLogin(state, value) {
      state.isLogin = value;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", state.token);
    },
    updateuser(state, value) {
      state.user = value;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    clearuser(state) {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value);
      context.commit("updateLyric", res.lrc);
    },
    async getPhoneLogin(context, value) {
      let res = await getPhoneLogin(value);
      return res;
      // context.commit("updateLyric", res.lrc);
    },
  },
  modules: {},
});
