// 可以定义一个对象，该对象那个最终会将它混入到组件中
// 组建有的，这个对象都可以有
import permissionPoints from "@/constant/permission";

export default {
  data() {
    return {
      points: permissionPoints,
    };
  },
  methods: {
    // 判断员工是否有删除编辑等权限
    isHasPoints(points) {
      return this.$store.state.permission.points.includes(points);
    },
  },
};
