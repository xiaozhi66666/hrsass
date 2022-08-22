import Layout from "@/layout";
export default {
  path: "/setting",
  component: Layout,
  meta: {
    id: "settings", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/setting"),
      meta: { title: "公司设置", icon: "setting" },
    },
  ],
};
