import Layout from "@/layout";
export default {
  path: "/departments",
  component: Layout,
  meta: {
    id: "departments", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/departments"),
      meta: { title: "组织架构", icon: "tree" },
    },
  ],
};
