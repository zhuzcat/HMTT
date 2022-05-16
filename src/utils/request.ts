import axios from "axios";

// 创建axios实例
const request = axios.create({
  baseURL: "http://toutiao.itheima.net",
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    return config;
  },
  (error) => {
    // 当请求失败的时候做一些处理
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
    // 对响应错误做一些处理
    return Promise.reject(error);
  }
);

export default request;
