import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css
import "default-passive-events";
import App from "./App";
import store from "./store";
import router from "./router";
import Print from "vue-print-nb";
// 导入i18n
import i18n from "@/i18n";

// Global instruction
Vue.use(Print);
import "@/icons"; // icon
import "@/permission"; // permission control
// 一次性导入所有指定文件中的数据
import * as derectives from "@/derectives";
// 循环对象，这样就可以注册derectives中所有的自定义指令
for (let key in derectives) {
  // Vue.derectives('参数1'（自定义指令名）,'参数2'（value）)
  Vue.directive(key, derectives[key]);
}
// 引入components组件
import components from "@/components";
// 注册所有组件
Vue.use(components);
// 一次性引入所有自定义过滤器
import * as filters from "@/filters";
// 循环注册自定义过滤器，这个对象key为过滤器的name，filters[key]为自定义指令方法
for (let key in filters) {
  Vue.filter(key, filters[key]);
}
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 模拟登录数据
// if (process.env.NODE_ENV === "production") {
//   const { mockXHR } = require("../mock");
//   mockXHR();
// }

// 添加全局自定义指令
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale });
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
