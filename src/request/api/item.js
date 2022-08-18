import service from "..";
//歌单详情页
export const getMusicItemList = (data) => {
  return service.request({
    url: `/playlist/detail?id=${data}`,
    method: "get",
  });
};
//获取歌单歌曲
export const getItemList = (data) => {
  return service.request({
    url: `/playlist/track/all?id=${data}&limit=30&offset=1`,
    method: "get",
  });
};

//获取歌词
export const getMusicLyric = (data) => {
  return service.request({
    url: `/Lyric?id=${data}`,
    method: "get",
  });
};

