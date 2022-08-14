import Layout from "@/layout";
export default {
  path: "/employees",
  component: Layout,
  children: [
    {
      path: "",
      component: () => import("@/views/employees"),
      meta: { title: "员工", icon: "people" },
    },
    {
      path: "detail/:id",
      component: () => import("@/views/employees/detail"),
      hidden: true, //隐藏在左侧菜单栏中显示
      // title: "员工详情",
    },
  ],
};
