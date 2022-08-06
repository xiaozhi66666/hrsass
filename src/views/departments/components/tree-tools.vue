<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="6">
      <el-row type="flex">
        <el-col :span="6">{{ treeNode.manager }}</el-col>
        <el-col :span="6">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('addDepart', treeNode)"
                >添加部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('showEdit', treeNode)"
                  >编辑部门</el-dropdown-item
                >
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentAPI } from "@/api/departments";
export default {
  name: "tree-tools",
  data() {
    return {};
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    // 通过自定义属性isRoot判断是否展示编辑和删除部门的功能，使用template包裹，v-if进行显示隐藏
    isRoot: {
      type: Boolean,
      default: false,
    },
  },

  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await delDepartmentAPI(this.treeNode.id);
        this.$emit("remove");
        this.message.success("删除成功!");
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped></style>
