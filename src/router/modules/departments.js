import Layout from "@/layout";
export default {
  path: "/departments",
  component: Layout,
  name: "departments",
  meta: {
    id: "departments", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      name: "departments",
      component: () => import("@/views/departments"),
      meta: { title: "departments", icon: "tree" },
    },
  ],
};
