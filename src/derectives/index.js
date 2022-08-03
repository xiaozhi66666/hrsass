// 定义一个自定义指令并导出
export const imgError = {
  // 将value从binfing解构出来
  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value;
    };
  },
};
