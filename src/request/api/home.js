import service from "..";
//获取轮播图
export const getBanner = (params) => {
  return service.request({
    url: "/banner?type=2",
    method: "get",
    params,
  });
};
//获取发现好歌单
export const getMusicList = (params) => {
  return service.request({
    url: "/personalized?limit=10",
    method: "get",
    params,
  });
};
//获取搜索记录
export const getSearchMusic = (data) => {
  return service.request({
    url: `/search?keywords=${data}`,
    method: "get",
  });
};
//登录
export const getPhoneLogin = (data) => {
  return service.request({
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    method: "get",
  });
};
//获取用户详情
export const getLoginUser = (data) => {
  return service.request({
    url: `/user/detail?uid=${data}`,
    method: "get",
  });
};
