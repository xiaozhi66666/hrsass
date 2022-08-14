<template>
  <el-dialog title="新增员工" :visible="visible" width="50%" @close="onClose">
    <!-- 表单 -->
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          v-model="formData.departmentName"
          placeholder="请选择部门"
          @focus="getDepts"
          ref="seletTree"
        >
          <el-option value="" class="treeOption" v-loading="isTreeLoading">
            <el-tree
              :data="depts"
              :props="treeProps"
              @node-click="treeSelect"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employees from "@/constant/employees";
// 获取部门列表数据
import { getTreeDataAPI } from "@/api/departments";

import { addEmployee } from "@/api/employees";
// 引入将数组格式化为树形数据的方法
import { transListToTree } from "@/utils";
// 将employees中的的存储的需要用的数组解构出来
const { hireType } = employees;
// 放入data中等待使用
export default {
  data() {
    return {
      depts: [],
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      rules: {
        username: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "change" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "change" },
        ],
        timeOfEntry: [{ required: true, message: "入职时间", trigger: "blur" }],
      },
      hireType,
      isTreeLoading: false, //控制部门选择框的loading效果
      //   自定义树形数据的属性名
      treeProps: {
        label: "name",
      },
    };
  },
  props: {
    visible: {
      type: Boolean, //
      required: true,
    },
  },

  created() {},

  methods: {
    // 关闭弹层事件
    onClose() {
      this.$emit("update:visible", false);
    },
    async getTreeData() {
      this.isTreeLoading = true;
      const { depts } = await getTreeDataAPI();
      //   格式化数组，将内容格式化为树形数据
      transListToTree(depts, "");
      this.depts = depts;
      this.isTreeLoading = false;
    },
    // 获取焦点时触发，获取树形数据
    getDepts() {
      this.getTreeData();
    },
    // 点击树形节点触发的方法
    treeSelect(row) {
      // 点击到的name赋值给v-model绑定的对象属性
      this.formData.departmentName = row.name;
      //   触发el-select组件的blur事件，关闭下拉框
      this.$refs.seletTree.blur();
    },
    // 确定
    onSave() {
      // 判断是否通过表单校验
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        console.log("校验通过，发送请求");
        await addEmployee(this.formData);
        this.$message.success("添加运功成功！");
        // 触发刷新父组件获取数据的请求
        this.$emit("addEmployees");
        // 关闭弹层
        this.onClose();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover .el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}

.treeOption {
  height: 100px;
}
</style>
