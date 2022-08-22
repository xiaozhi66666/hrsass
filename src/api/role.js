import request from "@/utils/request";

/**
 *获取所有角色列表
 * @param {Object} params page	是	1	页码
    pagesize	是	10	每页条数
 * @returns promise
 */
export const getRolesListAPI = (params) =>
  request({
    url: "/sys/role",
    params,
  });

/**
 *添加角色
 * @param {Object} data  name	string	必须		角色名称	
        region	string	必须		角色描述	
 * @returns promise
 */
export const addRolesAPI = (data) =>
  request({
    url: "/sys/role",
    method: "POST",
    data,
  });

/**
 *
 * @param {*} id 角色id
 * @returns
 */
export const getRoleInfoApi = (id) =>
  request({
    url: `/sys/role/${id}`,
  });

/**
 *给角色分配权限
 * @param {*} data 角色id  权限id数组
 * @returns
 */
export function assignPerm(data) {
  return request({
    url: "/sys/role/assignPrem",
    method: "put",
    data,
  });
}
