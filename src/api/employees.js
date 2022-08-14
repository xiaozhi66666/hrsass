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
/**
/**
 * 删除员工接口
 * ****/

export function delEmployeeApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: "delete",
  });
}

export const getDeptsAPi = () =>
  request({
    url: "",
  });

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: "post",
    url: "/sys/user",
    data,
  });
}

export function importEmployeesApi(data) {
  return request({
    url: "/sys/user/batch",
    method: "post",
    data,
  });
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  });
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: "put",
    data,
  });
}
