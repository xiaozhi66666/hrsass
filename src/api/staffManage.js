import request from "@/utils/request";

/**
 * 获取员工列表
 * @returns promise
 */
export const getStaffListAPI = () =>
  request({
    url: "/sys/user/simple",
  });
