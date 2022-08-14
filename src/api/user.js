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

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfoApi = () =>
  request({
    url: "/sys/profile",
    method: "POST",
  });

/**
 * 获取用户详细信息（包含用户头像）
 * @param {String} id  用户id
 * @returns
 */
export const getUserInfoDetail = (id) =>
  request({
    url: `/sys/user/${id}`,
  });

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: "put",
    data,
  });
}
