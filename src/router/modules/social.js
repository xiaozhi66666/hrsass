import Layout from "@/layout";
export default {
  path: "/social",
  component: Layout,
  meta: {
    id: "social_ssecuritys", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/social"),
      meta: { title: "社保", icon: "table" },
    },
  ],
};
