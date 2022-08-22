import Layout from "@/layout";
export default {
  path: "/attendances",
  component: Layout,
  meta: {
    id: "attendances", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/attendances"),
      meta: { title: "考勤", icon: "skill" },
    },
  ],
};
