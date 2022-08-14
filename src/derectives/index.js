// 定义一个自定义指令并导出
export const imgError = {
  // 将value从binfing解构出来
  // inserted只能执行一次，指令绑定的元素插入到dom时触发，当数据还没有回来插入只会在插入dom中
  inserted: function (el, { value }) {
    // 先对图片的src进行判断，如果不存在，也将用户自定义的src赋值给图片的src
    if (!el.src) {
      el.src = value;
    } else {
      el.onerror = function () {
        el.src = value;
      };
    }
  },
  // 视图更新后再进行一次判断，如果还是src为false，就将默认值赋给图片的src
  // dom更新后会触发的钩子
  update(el, { value }) {
    if (!el.src) {
      el.src = value;
    }
  },
};
