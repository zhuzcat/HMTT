import axios from "axios";
import { Notify } from "vant";
import router from "@/routes";
import { getToken } from "./token";

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
  (error) => {
    console.log(error);

    if (error.response.status === 401) {
      // 如果token过期，重新登录
      Notify({ type: "warning", message: "登录失效，请重新登录" });
      router.replace("/login");
    }
    // 当请求失败的时候做一些处理
    // 对响应错误做一些处理
    return Promise.reject(error);
  }
);

export default request;
