import request from "@/utils/request";

/**
 *查询企业的部门列表
 * @returns promise
 */
export const getTreeDataAPI = () =>
  request({
    url: "/company/department",
  });

/**
 *根据ID删除部门
 * @param {String} id  需要删除的部门id
 * @returns promise
 */
export const delDepartmentAPI = (id) =>
  request({
    url: `/company/department/${id}`,
    method: "DELETE",
  });

/**
 *新增部门
 * @param {Object} data code			部门编码，同级部门不可重复	  introduce			介绍	
    manager			负责人名称	
    name			部门名称	
    pid		父级部门ID
 * @returns promise
 */
export const addDepartmentAPI = (data) =>
  request({
    url: "/company/department",
    method: "POST",
    data: data,
  });

/**
 * 根据id获取部门详情
 * @param {String} id
 * @returns promise
 */
export const getTreeDataByIdAPI = (id) =>
  request({
    url: `/company/department/${id}`,
  });

/**
 *根据id修改部门详情
 * @param {Object} data
 * @returns  promise
 */
export const editDepartInfoAPI = (data) =>
  request({
    url: `/company/department/${data.id}`,
    method: "PUT",
    data,
  });
