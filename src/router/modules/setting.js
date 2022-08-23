import Layout from "@/layout";
export default {
  path: "/setting",
  component: Layout,
  name: "setting",
  meta: {
    id: "settings", //用于跟后台返回路由对应起来的id标识
    title: "settings",
  },
  children: [
    {
      path: "",
      name: "setting",
      component: () => import("@/views/setting"),
      meta: { title: "settings", icon: "setting" },
    },
  ],
};
