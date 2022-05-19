import request from "@/utils/request";

// 获取全部频道的接口
export const reqAllChanels = () =>
  request({ url: "/v1_0/channels", method: "GET" });
// 登录的接口
export const loginApi = (data: { mobile: string; code: string }) =>
  request({ url: "/v1_0/authorizations", method: "POST", data });
// 获取用户频道的接口
export const reqUserChannels = () =>
  request({
    url: "v1_0/user/channels",
    method: "GET",
  });
// 获取文张列表
export const reqArticleList = (params: {
  channel_id: string;
  timestamp: number;
}) => request({ url: "/v1_0/articles", method: "GET", params });
// 不感兴趣文章
export const reqUnLike = (data: {}) =>
  request({
    url: "/v1_0/article/dislikes",
    method: "POST",
    data,
  });
// 举报文章
export const reqReport = (data: {}) =>
  request({
    url: "/v1_0/article/reports",
    method: "POST",
    data,
  });
// 添加用户频道
export const reqAddUserChannel = (data: {}) =>
  request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data,
  });
// 删除用户频道
export const reqDeleteUserChannel = (target: number) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: "DELETE",
  });
