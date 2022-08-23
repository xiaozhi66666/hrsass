import Layout from "@/layout";
export default {
  path: "/permission",
  component: Layout,
  name: "permission",
  meta: {
    id: "permissions", //用于跟后台返回路由对应起来的id标识
    title: "permissions",
  },
  children: [
    {
      path: "",
      name: "permission",
      component: () => import("@/views/permission"),
      meta: { title: "permissions", icon: "lock" },
    },
  ],
};
