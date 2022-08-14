import dayjs from "dayjs";
// 自定义过滤器的抽离
export const timeFormat = (val) => {
  return dayjs(val).format("YYYY-MM-DD");
};
