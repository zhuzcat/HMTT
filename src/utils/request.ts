import axios from "axios";
import { Notify, Toast } from "vant";
import router from "@/routes";
import { reqRefreshToken } from "@/api";
import { getToken, setToken, removeToken } from "./token";

// 创建axios实例
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (getToken() && config.headers!.Authorization === undefined) {
      config.headers = { Authorization: `Bearer ${getToken()}` };
    }
    // 在请求发送之前做一些处理
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // 如果token过期，重新登录
      const res = await reqRefreshToken();
      if (res.status === 201) {
        // 更新token
        setToken(res.data.data.token);
        // 重新发起请求
        error.response.config.headers.Authorization = `Bearer ${getToken()}`;
        return request(error.response.config);
      }
    } else if (
      error.response.status === 500 &&
      error.response.config.url === "/v1_0/authorizations" &&
      error.response.config.method === "put"
    ) {
      Notify({
        type: "danger",
        message: "登录失效请重新登录",
      });
      removeToken();
      router.push("/login");
    }
    // 当请求失败的时候做一些处理
    // 对响应错误做一些处理
    return Promise.reject(error);
  }
);

export default request;
