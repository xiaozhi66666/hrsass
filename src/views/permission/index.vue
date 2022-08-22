<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" @click="showDialog('0', 1)"
            >权限控制</el-button
          >
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        :data="permissions"
        style="width: 100%"
        slot="right"
        row-key="id"
        ref="table"
      >
        <el-table-column label="名称" width="180">
          <template v-slot="{ row }">
            <i
              class="el-icon-folder-opened"
              v-if="row.children"
              @click="expand(row)"
            ></i>
            <i
              class="el-icon-tickets"
              v-if="row.type === 2"
              @click="expand(row)"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showDialog(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog :title="`添加权限点`" :visible.sync="isShowDialog">
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSave"
            >确定</el-button
          >
          <el-button size="small">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from "@/api/permission";
import { transListToTree } from "@/utils";
export default {
  name: "Permission",
  data() {
    return {
      permissions: [],
      list: [],
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
        ],
      },
      isShowDialog: false,
    };
  },

  created() {
    this.getPermissions();
  },

  methods: {
    async getPermissions() {
      const res = await getPermissionList();
      this.permissions = transListToTree(res, "0");
    },
    expand(row) {
      // 自定义一个row 的属性,控制每次打开关闭的变量
      row.isExpand = !row.isExpand;
      this.$refs.table.toggleRowExpansion(row, row.isExpand);
    },
    showDialog(id, type) {
      this.isShowDialog = true;
      this.formData.pid = id;
      this.formData.type = type;
    },
    onSave() {
      this.showDialog();
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填有效写数据后再进行提交！");
        }
        await addPermission(this.formData);
        this.$message.success("添加权限点成功！");
        this.isShowDialog = false;
        this.getPermissions();
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep.el-table [class*="el-table__row--level"] .el-table__expand-icon {
  display: none;
}
</style>
