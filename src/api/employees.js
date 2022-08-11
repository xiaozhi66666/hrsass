import request from "@/utils/request";

/**
 * 获取员工列表
 * @returns promise
 */
export const getStaffListAPI = () =>
  request({
    url: "/sys/user/simple",
  });

/**
 *获取员工列表
 * @param {Object} params page	是	1	页码
size	是	10	每页条数
 * @returns
 */
export const getEmployeesAPI = (params) =>
  request({
    url: "/sys/user",
    params,
  });
