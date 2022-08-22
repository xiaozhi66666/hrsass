import store from "@/store";
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

export const isHas = {
  // binding:指令和dom绑定，可获取传给自定义指令的数据
  // inserted:指令所绑定的元素插入到父节点时触发的函数
  // update:指令所绑定的Vnode(虚拟dom)
  inserted(el, binding) {
    // 获取vuex中的权限点数组数据,首先得引入store
    // 进行判断，是否包含传进来的字段
    console.log(el);
    console.log(binding);
    const isHas = store.state.permission.points.includes(binding.value);
    console.log(isHas);
    // 如果没有就移除该dom元素
    if (!isHas) {
      el.remove();
    }
  },
};
