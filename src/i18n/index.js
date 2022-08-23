import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "./messages/zh";
import en from "./messages/en";
import ja from "./messages/ja";
import Cookie from "js-cookie";
Vue.use(VueI18n);
// 准备翻译的语言环境信息
export const messages = {
  zh,
  en,
  // ja,
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookie.get("language") || "zh", // 设置地区
  messages, // 设置地区信息
});

export default i18n;
