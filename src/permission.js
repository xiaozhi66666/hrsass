import router from "@/router";
// 引入store
import store from "@/store";
// 放置（全局）前置路由守卫

//设置未登录可访问的白名单
const whiteList = ["/login", "/404"];

router.beforeEach((to, form, next) => {
  const isLogin = store.state.user.token;
  // 1:已登录
  if (isLogin) {
    //   判断是否要去的是登录页面
    //   是跳到首页
    //   不是就直接进入
    // to.path === "/login" ? next("/") : next();
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
    // if (to.path === "/login") return next("/");
    // next();
  } else {
    //   2：未登录
    // 否则就跳登录页
    const isCludes = whiteList.includes(to.path);
    if (isCludes) {
      //   是否访问的是未登录白名单，让访问
      next();
    } else {
      next("/login");
    }
    // 进行权限判断
  }
  // 调用了next 进入该路由，如果没有调用就无法进入
});
