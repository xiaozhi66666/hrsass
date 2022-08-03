import { getUserInfoApi, getUserInfoDetail, loginAPI } from "@/api/user";
import { setTimestamp } from "@/utils/auth";

export default {
  namespaced: true, //
  state: {
    token: "", //存储用户登录token
    userInfo: {}, //存储用户信息
  },
  mutations: {
    // 定义方法修改token
    setToken(state, payload) {
      state.token = payload;
    },
    // 修改userInfo
    setUserInfo(state, payload) {
      state.userInfo = payload;
      // 将登录时的时间戳存入本地
      setTimestamp();
    },
  }, //
  actions: {
    // 修改mutations中的方法
    // 获取登录token
    async getToken(context, payload) {
      // 发起登录请求获取token存入到vuex
      // 由于在请求拦截器中已经做了一层判断，直接返回的就是token，所以直接将res传过去就可以了
      const res = await loginAPI(payload);
      context.commit("setToken", res);
    },
    // 获取用户信息
    async getUserInfo(context, payload) {
      // 获取用户基本信息
      const userInfo = await getUserInfoApi();
      // 获取用户详细信息
      const userInfoDetail = await getUserInfoDetail(userInfo.userId);
      // 将两个获取到的信息结构出来放入一个对象，传递进去
      context.commit("setUserInfo", { ...userInfo, ...userInfoDetail });
    },
    // 退出登录
    logout(context) {
      // 将token置空
      context.commit("setToken", "");
      // 将用户信息置空对象
      context.commit("setUserInfo", {});
    },
  },
};
