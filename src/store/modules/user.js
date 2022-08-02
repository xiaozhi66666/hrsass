import { loginAPI } from "@/api/user";

export default {
  namespaced: true, //
  state: {
    toke: "", //存储用户登录token
  },
  mutations: {
    // 定义方法修改token
    setToken(state, payload) {
      state.token = payload;
    },
  }, //
  actions: {
    // 修改mutations中的方法
    async getToken(context, payload) {
      // 发起登录请求获取token存入到vuex
      // 由于在请求拦截器中已经做了一层判断，直接返回的就是token，所以直接将res传过去就可以了
      const res = await loginAPI(payload);
      context.commit("setToken", res);
    },
  },
};
