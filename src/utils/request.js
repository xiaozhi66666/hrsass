// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
  // 因为我们开启了反向代理服务器，并且在vue.config中配置了api请求头替换/所以在baseURL后面加/api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
service.interceptors.request.use(); // 请求拦截器
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
  function (error) {
    // 对响应错误做点什么
    // 提示错误信息
    Message.error("系统异常！请稍后重试");
    return Promise.reject(error);
  }
); // 响应拦截器
export default service; // 导出axios实例
