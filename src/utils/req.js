import axios from "axios";
import store from "@/store";
import { Toast } from "vant"

const ajax = axios.create({
  baseURL: "http://toutiao.itheima.net"
})
ajax.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  })
  // 在发送请求之前做些什么
  if (localStorage.getItem('usertokeninfo')) {
    config.headers.Authorization = `Bearer ${store.state.usertokeninfo.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  // this.$toast("系统错误", error.message);
  return Promise.reject(error);
});


// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  Toast.clear()
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  Toast("系统错误",error)
  // 对响应错误做点什么
  return Promise.reject(error);
});





ajax.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error.response.data.message);
});

export default ajax