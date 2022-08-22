import request from "@/utils/request";

// 获取权限
export function getPermissionList(params) {
  return request({
    url: "/sys/permission",
    params,
  });
}

/**
 *
 * @param {Object} data enVisible	string	非必须			
    name	string	非必须			
    code	string	非必须			
    description	string	非必须			
    type	number	非必须			
    pid	string	非必须
 * @returns
 */
export const addPermission = (data) =>
  request({
    url: "/sys/permission",
    method: "POST",
    data,
  });
