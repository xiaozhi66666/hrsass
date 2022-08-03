// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import router from "@/router";
import { getTimestamp } from "./auth";

const timeOut = () => {
  // 如果有token,需要先判断token是否过期，通过发请求时候获取当前的时间戳-登录时存入的时间戳  > 规定过期时间
  const timeNow = Date.now();
  const tokenTime = getTimestamp();
  const failTime = 2 * 60 * 60 * 1000;
  return timeNow - tokenTime > failTime;
};
const service = axios.create({
  // 因为我们开启了反向代理服务器，并且在vue.config中配置了api请求头替换/所以在baseURL后面加/api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 获取vuex中的token
  const token = store.state.user.token;
  if (token) {
    if (timeOut()) {
      // token过期,强制跳到登录页
      // 跳到login，首先要将本地存储的token和用户信息清空
      // 再push在login
      await store.dispatch("user/logout");
      router.push("/login");
      // 抛出错误
      return Promise.reject(new Error("登录过期"));
      // console.log("token过期,强制跳到登录页");
    } else {
      // token没有过期
      // 添加请求头携带token
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}); // 请求拦截器
service.interceptors.response.use(
  (res) => {
    // 将success,data,message从响应结果res.data中解构出来
    const { success, data, message } = res.data;
    // 对success进行判断
    if (success) {
      return data; //返回token
    } else {
      // 提示错误信息
      Message.error(message);
      // 抛出错误信息
      return Promise.reject(new Error(message));
    }
  },
  async function (error) {
    // 对响应错误做点什么
    // 提示错误信息
    // 如果后端相应回来的error.response.status === 401 表示携带的认证数据不正确，即后端进行token校验
    // es6新语法  ? 替代 &&
    if (error?.response?.status === 401) {
      // 提示错误信息
      Message.error("登陆过期");
      // 退出登录返回登录页
      // token过期,强制跳到登录页
      // 跳到login，首先要将本地存储的token和用户信息清空
      // 再push在login
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
); // 响应拦截器
export default service; // 导出axios实例
