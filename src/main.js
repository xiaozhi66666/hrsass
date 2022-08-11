import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css
import "default-passive-events";
import App from "./App";
import store from "./store";
import router from "./router";
// 一次性导入所有指定文件中的数据
import * as derectives from "@/derectives";
import "@/icons"; // icon
import "@/permission"; // permission control
// 引入components组件
import components from "@/components";
// 注册所有组件
Vue.use(components);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 模拟登录数据
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}
// 循环对象，这样就可以注册derectives中所有的自定义指令
for (let key in derectives) {
  // Vue.derectives('参数1'（自定义指令名）,'参数2'（value）)
  Vue.directive(key, derectives[key]);
}

// 添加全局自定义指令
// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
