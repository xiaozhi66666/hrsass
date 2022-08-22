import Layout from "@/layout";
export default {
  path: "/import",
  component: Layout,
  meta: {
    id: "import", //用于跟后台返回路由对应起来的id标识
  },
  hidden: true,
  children: [
    {
      path: "/import",
      component: () => import("@/views/import"),
      meta: { title: "权限管理", icon: "lock" },
    },
  ],
};
