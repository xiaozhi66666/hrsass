import Layout from "@/layout";
export default {
  path: "/approvals",
  component: Layout,
  meta: {
    id: "approvals", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/approvals"),
      meta: { title: "审批", icon: "tree-table" },
    },
  ],
};
