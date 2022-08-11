import PageTools from "@/components/PageTools";

// 定义一个数组，接收所有的组件，循环注册，其中组件名需要在当前组件内添加name:组件名,就可以在循环时候拿到使用
const components = [PageTools];
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
