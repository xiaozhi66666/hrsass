import Layout from "@/layout";
export default {
  path: "/employees",
  component: Layout,
  meta: {
    id: "employees", //用于跟后台返回路由对应起来的id标识
  },
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
    {
      path: "print/:id",
      component: () => import("@/views/employees/print"),
      hidden: true, //隐藏在左侧菜单栏中显示
      // title: "员工详情",
    },
  ],
};
