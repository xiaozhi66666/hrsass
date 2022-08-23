import Layout from "@/layout";

export default {
  path: "/users",
  component: Layout,
  hidden: true,
  name: "user",
  meta: {
    id: "user", //用于跟后台返回路由对应起来的id标识
  },
  children: [
    {
      path: "/users/approvals",
      component: () => import("@/views/users/approvals"),
      name: "usersApprovals",
      hidden: true,
      meta: {
        title: "user",
      },
    },
    {
      path: "/users/info",
      component: () => import("@/views/users/info"),
      name: "myInfo",
      hidden: true,
      meta: {
        title: "我的信息",
      },
    },
  ],
};
