import zhLocale from "element-ui/lib/locale/lang/zh-CN";
export default {
  name: "中文",
  message: "你好，世界",
  workDate: "工作日历",
  ...zhLocale,
  route: {
    dashboard: "首页",
    departments: "部门",
    approvals: "审批",
    employees: "员工",
    permissions: "权限",
    salarys: "工资",
    settings: "设置",
    social_securitys: "社保",
    attendances: "考勤",
  },
};
