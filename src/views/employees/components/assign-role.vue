<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      title="角色分配"
      @close="close"
      @open="onOpen"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesListAPI } from "@/api/role";
import { getUserInfoDetail } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  data() {
    return {
      checkList: [],
      roles: [],
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  created() {
    // 不在created中调用，因为一进入页面就会被调用执行
    // this.getRolesList();
  },

  methods: {
    // 关闭
    close() {
      this.$emit("update:dialogVisible", false);
    },
    // 获取角色列表数据
    async getRolesList() {
      const { rows } = await getRolesListAPI();
      this.roles = rows;
    },
    // 在dialog打开时候自带的open事件会在dialog打开时候进行调用
    onOpen() {
      this.getRolesList();
      this.getUserRole();
    },
    // 获取员工已有角色
    async getUserRole() {
      const { roleIds } = await getUserInfoDetail(this.employeesId);
      this.checkList = roleIds;
    },
    // 分配角色
    async assignRole() {
      // 首先判断是否选择了角色
      if (!this.checkList.length) return this.$message.error("请选择权限");
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      });
      this.$message.success("分配权限成功！");
      this.close();
    },
  },
};
</script>

<style lang="less" scoped></style>
