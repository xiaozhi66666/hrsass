import router, { asyncRoutes } from "@/router";
// 引入store
import store from "@/store";
// 放置（全局）前置路由守卫

//设置未登录可访问的白名单
const whiteList = ["/login", "/404"];

router.beforeEach(async (to, form, next) => {
  const isLogin = store.state.user.token;
  const userId = store.state.user.userInfo.userId;
  // 1:已登录
  if (isLogin) {
    // 触发存入用户信息的vuex  action方法
    if (!userId) {
      //如果vuex中没有id，重新触发刷新获取，优化解决每次切换不同页面路由都会刷新，发送请求用户信息的请求
      // 这里添加await，因为dispatch返回的是promise，需要在页面跳转前保证信息已经存入到vuex中，所以添加await,等信息存入完毕之后再进行跳转
      const { roles } = await store.dispatch("user/getUserInfo"); //接收actions中return的数据
      // console.log(asyncRoutes);
      // console.log(roles);
      //将得到的该用户拥有的权限数组从vuex中返回出来
      //再将数据传入到处理权限的vuex模块中进行进一步处理
      // 因为必须等到dispatch触发才能进行跳转  所以 +  await
      // console.log(roles);
      await store.dispatch("permission/filterRoutes", roles);
      await store.dispatch("permission/getPoints", roles.points);
      next(to.path);
      // 动态添加路由
      // console.log(routes);
    }
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
