import PageTools from "@/components/PageTools";
import UploadExcel from "@/components/uploadExcel";
import UploadImg from "@/components/UpIoadImg";
import Calendar from "@/components/Calendar";
import FullScreen from "@/components/FullScreen";
import ToogleLang from "@/components/ToogleLang";

// 定义一个数组，接收所有的组件，循环注册，其中组件名需要在当前组件内添加name:组件名,就可以在循环时候拿到使用
const components = [
  PageTools,
  UploadExcel,
  UploadImg,
  Calendar,
  FullScreen,
  ToogleLang,
];
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
