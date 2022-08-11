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
