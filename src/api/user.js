import request from "@/utils/request";

/**
 * 登录获取token
 * @param {Object} data mobile/password
 * @returns Promise
 */
export const loginAPI = (data) =>
  request({
    url: "/sys/login",
    method: "POST",
    data,
  });
