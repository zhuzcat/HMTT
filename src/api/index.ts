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
// 获取搜索建议
export const reqSearchSuggest = (keyword: string) =>
  request({
    url: "/v1_0/suggestion",
    method: "GET",
    params: {
      q: keyword,
    },
  });
// 获取搜索结果
export const reqSearchResult = (params: {}) =>
  request({
    url: "/v1_0/search",
    method: "GET",
    params,
  });
// 获取文章详情
export const reqArticleDetail = (id: string) =>
  request({
    url: `/v1_0/articles/${id}`,
    method: "GET",
  });
// 关注用户
export const reqFollowUser = (target: string) =>
  request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
// 取消关注用户
export const reqUnFollowUser = (target: string) =>
  request({
    url: `/v1_0/user/followings/${target}`,
    method: "DELETE",
  });
// 对文章点赞
export const reqLikeArticle = (target: number) =>
  request({
    url: "/v1_0/article/likings",
    method: "POST",
    data: {
      target,
    },
  });
// 取消对文章点赞
export const reqUnLikeArticle = (target: number) =>
  request({
    url: `/v1_0/article/likings/${target}`,
    method: "DELETE",
  });
// 收藏文章
export const reqCollectArticle = (target: number) =>
  request({
    url: "/v1_0/article/collections",
    method: "POST",
    data: {
      target,
    },
  });
// 取消收藏文章
export const reqUnCollectArticle = (target: number) =>
  request({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });
// 获取文章评论
export const reqArticleComment = (params: {}) =>
  request({
    url: "/v1_0/comments",
    method: "GET",
    params,
  });
// 发表评论
export const reqAddComment = (data: {}) =>
  request({
    url: "/v1_0/comments",
    method: "POST",
    data,
  });
// 对评论点赞
export const reqLikeComment = (target: number) =>
  request({
    url: "/v1_0/comment/likings",
    method: "POST",
    data: {
      target,
    },
  });
// 对评论取消点赞
export const reqUnLikeComment = (target: number) =>
  request({
    url: `/v1_0/comment/likings/${target}`,
    method: "DELETE",
  });
// 获取用户自己信息
export const reqUserInfo = () =>
  request({
    url: "/v1_0/user",
    method: "GET",
  });
// 获取用户个人资料
export const reqUserProfile = () =>
  request({
    url: "/v1_0/user/profile",
    method: "GET",
  });
// 修改用户头像
export const reqUpdatePhoto = (data: {}) =>
  request({
    url: "/v1_0/user/photo",
    method: "PATCH",
    data,
  });
// 编辑用户个人资料
export const reqUpdateProfile = (data: {}) =>
  request({
    url: "/v1_0/user/profile",
    method: "PATCH",
    data,
  });
// 刷新用户token
export const reqRefreshToken = () =>
  request({
    url: "/v1_0/authorizations",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
    },
  });
