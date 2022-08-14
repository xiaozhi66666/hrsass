<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="beforeUpload" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import employees from "@/constant/employees";
import { importEmployeesApi } from "@/api/employees";
const { importMapKeyPath } = employees;
import { timeFormat } from "@/filters";
export default {
  data() {
    return {};
  },

  created() {},

  methods: {
    // 上传之前进行判断
    beforeUpload({ name }) {
      if (!name.endsWith("xlsx")) {
        this.$message.error("请选择xslx文件！");
        return false;
      }
      return true;
    },
    //上传成功后的的回调
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {};
        for (const key in importMapKeyPath) {
          if (key === "入职日期" || key === "转正日期") {
            // exdel时间戳  timestamp 代表的是天数而且比js时间戳转成天数 多一天
            const timestamp = item[key];
            // 转换成js时间戳
            const date = new Date((timestamp - 1) * 24 * 3600000);
            // 改成年份，并且年份比js年份多70年
            // excel的年份从1900开始  js从1970开始
            date.setFullYear(date.getFullYear() - 70);

            obj[importMapKeyPath[key]] = timeFormat(date);
          } else {
            // 给空对象obj一次添加映射关系中的对应英文属性值
            obj[importMapKeyPath[key]] = item[key];
          }
        }
        return obj;
      });
      await importEmployeesApi(newArr);
      this.$message.success("批量导入成功！");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped></style>
