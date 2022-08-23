import Layout from "@/layout";

const attendRouter = {
  path: "/attendances",
  component: Layout,
  name: "attendances",
  meta: {
    id: "attendances", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "",
      component: () => import("@/views/attendances"),
      name: "attendances",
      meta: {
        title: "attendances",
        icon: "excel",
      },
    },
    {
      path: "archiving",
      component: () => import("@/views/attendances/historical"),
      name: "archiving",
      hidden: true,
      meta: {
        title: "归档",
      },
    },
    {
      path: "report/:month",
      component: () => import("@/views/attendances/report"),
      name: "reports",
      hidden: true,
      meta: {
        title: "报表",
      },
    },
  ],
};
export default attendRouter;
