import Layout from "@/layout";
export default {
  path: "/import",
  component: Layout,
  hidden: true,
  children: [
    {
      path: "/import",
      component: () => import("@/views/import"),
      meta: { title: "权限管理", icon: "lock" },
    },
  ],
};
