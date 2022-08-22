import router, { constantRoutes, asyncRoutes } from "@/router";

export default {
  namespaced: true, //
  state: {
    routes: [], //我们自己维护的路由规则，（静态+动态）
    points: [],
  },
  mutations: {
    setRoutes(state, route) {
      // 路由规则 = 静态 + 动态
      state.routes = [...constantRoutes, ...route];
    },
    setPoints(state, payload) {
      //
      state.points = payload;
    },
  }, //
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item.meta.id);
        return roles.menus.includes(item.meta.id);
      });
      // console.log(routes);
      context.commit("setRoutes", routes);
      router.addRoutes([
        ...routes,
        {
          path: "*",
          redirect: "/404",
          hidden: true,
        },
      ]);
    },
    getPoints(context, points) {
      // console.log(points);
      context.commit("setPoints", points);
    },
  },
};
