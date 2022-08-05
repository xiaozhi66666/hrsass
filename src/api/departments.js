import request from "@/utils/request";

/**
 *查询企业的部门列表
 * @returns promise
 */
export const getTreeDataAPI = () =>
  request({
    url: "/company/department",
  });
