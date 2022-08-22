import Layout from "@/layout";
export default {
  path: "/salarys",
  component: Layout,
  meta: {
    id: "salarys", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/salarys"),
      meta: { title: "工资", icon: "money" },
    },
  ],
};
