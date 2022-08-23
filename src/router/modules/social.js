import Layout from "@/layout";

export default {
  path: "/social_securitys",
  component: Layout,
  name: "social_securitys",
  meta: {
    id: "social_securitys", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/social"),
      name: "social_securitys",
      meta: {
        title: "social_securitys",
        icon: "table",
      },
    },
    // 报表
    {
      path: "detail/:id",
      hidden: true,
      component: () => import("@/views/social/detail"),
      name: "socialDetail",
      meta: {
        title: "社保",
      },
    },
    // 历史归档
    {
      path: "historicalArchiving",
      hidden: true,
      component: () => import("@/views/social/historical"),
      name: "socialHistorical",
      meta: {
        title: "历史归档",
      },
    },
    // 月报表
    {
      path: "monthStatement",
      component: () => import("@/views/social/month"),
      name: "socialMonthStatement",
      hidden: true,
      meta: {
        title: "当月报表",
      },
    },
  ],
};
