<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="true">
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('import')"
            v-if="isHasPoints(employeesPermission.employeesPer.import)"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportEmployees"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addEmployees"
            v-if="isHasPoints(employeesPermission.employeesPer.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="员工头像">
            <template slot-scope="{ row }">
              <img
                @click="isShowEwPhoto(row.staffPhoto)"
                :src="row.staffPhoto"
                alt=""
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterFormOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">{{
              row.timeOfEntry | timeFormat
            }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="skyblue"
                inactive-color="#13ce66"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="showRoleAssign(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delStaff(row.id)"
                :disabled="!isHasPoints(employeesPermission.employeesPer.del)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="total,sizes,prev, pager, next"
            :total="total"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pages.size"
            @current-change="currentChangePage"
            @size-change="currentChangeSize"
            :current-page.sync="pages.page"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee
      :visible.sync="showAddEmployees"
      @addEmployees="getEmployees"
    />
    <!-- 图片二维码弹出层 -->
    <el-dialog title="图片二维码" :visible.sync="dialogVisible">
      <el-row type="flex" justify="center">
        <canvas id="canvas" />
      </el-row>
    </el-dialog>
    <!-- 角色弹出层 -->
    <assign-role
      :dialogVisible.sync="roleVisible"
      :employeesId="currentRoleId"
    />
  </div>
</template>

<script>
import { getEmployeesAPI, delEmployeeApi } from "@/api/employees";
import employees from "@/constant/employees";
const { exportExcelMapPath, hireType } = employees;
import employeesPer from "@/constant/permission";
import AddEmployee from "./components/add-employees";
import AssignRole from "./components/assign-role.vue";
import QrCode from "qrcode";
// import AssignRole from './components/assign-role.vue';
// import { export_json_to_excel } from "@/vendor/Export2Excel";

export default {
  name: "Employees",
  data() {
    return {
      employeesList: [], //存储员工信息列表
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      loading: false,
      showAddEmployees: false, //控制是否展示新增弹出层
      dialogVisible: false,
      roleVisible: false,
      currentRoleId: "", //点击到的当前的id
      employeesPermission: employeesPer,
    };
  },
  components: {
    AssignRole,
    AddEmployee,
  },

  created() {
    this.getEmployees();
  },

  methods: {
    async getEmployees() {
      this.loading = true;
      const { rows, total } = await getEmployeesAPI(this.pages);
      this.employeesList = rows;
      this.total = total;
      this.loading = false;
    },
    // 页码发生改变触发的事件
    currentChangePage(val) {
      this.pages.page = val;
      this.getEmployees();
    },
    // 一页的数据量发生改变触发的事件
    async currentChangeSize(val) {
      console.log(val);
      this.pages.size = val;
      this.getEmployees();
    },
    formatterFormOfEmployment(row, column, cellValue, index) {
      // 通过定义好的模块映射关系，循环遍历定义好的数组，根据id寻找到对应项，根据是否找到对应项，返回该id对应的value
      const findObj = hireType.find((item) => item.id === cellValue);
      return findObj ? findObj.value : "未知";
    },
    async delStaff(id) {
      await this.$confirm("确定删除？");
      await delEmployeeApi(id);
      this.$message.success("删除成功！");
      this.getEmployees();
    },
    // 新增员工
    addEmployees() {
      this.showAddEmployees = true;
    },
    // 导出
    async exportEmployees() {
      console.log(hireType);
      // 模块导入懒加载
      const { export_json_to_excel } = await import("@/vendor/Export2Excel");
      const { rows } = await getEmployeesAPI({
        page: 1, //
        size: this.total, //
      });
      // 表头数据
      const header = Object.keys(exportExcelMapPath);

      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === "聘用形式") {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]];
            });
            return findItem ? findItem.value : "未知";
          } else {
            return item[exportExcelMapPath[h]];
          }
        });
      });
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: "员工列表", //非必填文件名
        autoWidth: true, //非必填
        bookType: "xlsx", //非必填
        multiHeader: [["手机号", "其他信息", "", "", "", "", "部门"]],
        merges: ["A1:A2", "B1:F1", "G1:G2"],
      });
    },
    // 展示头像二维码
    isShowEwPhoto(staffPhoto) {
      if (!staffPhoto) {
        return this.$message.error("该用户暂无头像");
      }
      this.dialogVisible = true;
      // 数据更新驱动视图是异步的，视图需要等到所有数据更新完成之后再进行更新，所以使用$nextTick进行获取最新视图
      this.$nextTick(() => {
        const canvas = document.getElementById("canvas");
        QrCode.toCanvas(canvas, staffPhoto);
      });
    },
    //显示角色分配弹层
    showRoleAssign(id) {
      this.currentRoleId = id;
      this.roleVisible = true;
    },
    // 判断员工是否有删除编辑等权限
    isHasPoints(points) {
      return this.$store.state.permission.points.includes(points);
    },
  },
};
</script>

<style lang="scss" scoped></style>
