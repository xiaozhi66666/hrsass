<template>
  <div>
    <el-dropdown @command="isSelected">
      <span class="el-dropdown-link">
        <svg-icon style="color: #fff; font-size: 28px" icon-class="language" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :disabled="key === $i18n.locale"
          :command="key"
          v-for="(item, key) in messages"
          :key="key"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from "@/i18n";
import Cookie from "js-cookie";
export default {
  name: "ToogleLang",
  data() {
    return { messages };
  },

  created() {},

  methods: {
    isSelected(val) {
      // console.log(val);
      this.$i18n.locale = val;
      //刷新页面
      this.$router.go(0);
      // 存入本地
      Cookie.set("language", val);
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-dropdown-link {
//   cursor: pointer;
//   color: #409eff;
// }
// .el-icon-arrow-down {
//   font-size: 12px;
// }
</style>
