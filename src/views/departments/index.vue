<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <treeTools :treeNode="company" :isRoot="true" @addDepart="addDepart" />
        <!-- 树形 -->
        <el-tree :data="treeDate" :props="defaultProps" default-expand-all>
          <!-- 使用插槽将头部插入到树节点内容处 -->
          <template v-slot="{ data }">
            <treeTools
              :treeNode="data"
              @remove="getTreeData"
              @addDepart="addDepart"
              @showEdit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门弹出层 -->
    <addDepart
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @close="getTreeData"
      ref="addDepart"
    />
  </div>
</template>

<script>
import treeTools from "./components/tree-tools.vue";
import { getTreeDataAPI } from "@/api/departments";
import { transListToTree } from "@/utils";
import addDepart from "./components/addDepart.vue";
export default {
  components: { treeTools, addDepart },
  data() {
    return {
      defaultProps: {
        //配置需要展示的数据对象自定义属性属性   label:父级数据名自定义name  children子级数据名
        label: "name",
      },
      treeDate: [
        { name: "总裁办", children: [{ name: "董事会" }] },
        { name: "行政部" },
        { name: "人事部" },
      ],
      company: { name: "传智教育", manager: "负责人" },
      dialogVisible: false,
      currentNode: {},
      loading: false,
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      this.loading = true;
      const res = await getTreeDataAPI();
      // 调用封装好的处理树状结构的方法，将需要处理的数据传入，并且将第一层的标识符传入即可
      this.treeDate = transListToTree(res.depts, "");
      this.loading = false;
    },
    addDepart(value) {
      this.dialogVisible = true;
      this.currentNode = value;
    },
    showEdit(val) {
      this.dialogVisible = true;
      // 触发子组件内的方法
      this.$refs.addDepart.getDept(val.id);
    },
  },
};
</script>

<style scoped>
.el-dropdown {
  cursor: pointer;
}
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
