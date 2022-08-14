<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="formData"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail, saveUserDetailById } from "@/api/user";
//引入cookies
import Cookies from "js-cookie";
import UserInfo from "./components/user-info.vue";
export default {
  name: "employeesDetail",
  data() {
    return {
      formData: {},
      activeTabName: Cookies.get("employeesTabName") || "account",
    };
  },
  components: {
    UserInfo,
  },

  created() {
    this.loadUserInfoDetail();
  },

  methods: {
    async loadUserInfoDetail() {
      const res = await getUserInfoDetail(this.$route.params.id);
      this.formData = res;
    },
    async onSave() {
      await saveUserDetailById(this.formData);
      this.$message.success("更新用户信息成功！");
    },
    handleTabClick() {
      Cookies.set("employeesTabName", this.activeTabName);
    },
  },
};
</script>

<style lang="less" scoped></style>
