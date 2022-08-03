import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

//定义一个方法将当前时间戳存入cookies
export const setTimestamp = () => {
  Cookies.set("timestampNow", Date.now());
};

// 定义一个方法取上面存入的timestampNow

export const getTimestamp = () => {
  return Cookies.get("timestampNow");
};
