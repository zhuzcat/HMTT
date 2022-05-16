import request from "@/utils/request";
import { getToken } from "@/utils/token";

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
    headers: { Authorization: `Bearer ${getToken()}` },
  });
