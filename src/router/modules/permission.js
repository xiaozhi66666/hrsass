import Layout from "@/layout";
export default {
  path: "/permission",
  component: Layout,
  meta: {
    id: "permissions", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/permission"),
      meta: { title: "权限管理", icon: "lock" },
    },
  ],
};
