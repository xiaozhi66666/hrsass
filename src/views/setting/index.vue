<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="新增角色" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>

            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pagesize"
            :page-sizes="[3, 5, 10, 15]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px" :model="companyInfo">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加角色对话框 -->
      <el-dialog
        title="提示"
        @close="dialogOnClose"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <!-- 表单区域 -->
        <el-form
          ref="form"
          label-width="80px"
          :model="roleForm"
          :rules="roleFormRules"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button @click="addRoles">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRolesListAPI, addRolesAPI } from "@/api/role";
import { getCompanyInfoApi } from "@/api/company";
export default {
  name: "companySetting",
  data() {
    return {
      activeName: "first",
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 2,
      addDialogVisible: false,
      roleForm: {
        name: "",
        description: "",
      },
      // 校验规则
      roleFormRules: {
        name: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
      },
      companyInfo: {},
    };
  },

  created() {
    this.getRolesList();
    this.getCompanyInfo();
  },

  methods: {
    async getRolesList() {
      const { rows, total } = await getRolesListAPI({
        page: this.page,
        pagesize: this.pagesize,
      });
      this.tableData = rows;
      this.total = total;
    },
    // 监听每页条数的变化
    handleCurrentChange(val) {
      this.page = val;
      this.getRolesList();
    },
    // 监听页码的变化
    handleSizeChange(val) {
      this.pagesize = val;
      this.getRolesList();
    },
    async addRoles() {
      await this.$refs.form.validate();
      console.log("校验通过");
      await addRolesAPI(this.roleForm);
      this.addDialogVisible = false;
      this.$message.success("添加角色成功！");
      this.getRolesList();
    },
    // 监听对话框关闭
    dialogOnClose() {
      // 重置表单内容
      this.$refs.form.resetFields();
      this.roleForm.description = "";
    },
    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      );
      this.companyInfo = res;
    },
  },
};
</script>

<style scoped lang="less"></style>
