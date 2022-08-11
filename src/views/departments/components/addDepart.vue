<template>
  <el-dialog
    :title="activeTitle"
    :visible="visible"
    width="60%"
    @close="onCloseDialog"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formDataRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in staffList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onCloseDialog">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getTreeDataAPI,
  addDepartmentAPI,
  editDepartInfoAPI,
} from "@/api/departments";
import { getStaffListAPI } from "@/api/employees";
import { getTreeDataByIdAPI } from "@/api/departments";
export default {
  name: "addDapart",
  data() {
    // 检查部门名是否重复
    const checkoutDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        // 编辑
        const { depts } = await getTreeDataAPI();
        const filterList = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        );
        const isReapt = filterList.some((item) => item.name === value);
        //  如果重复，newError
        isReapt ? callback(new Error("部门重复")) : callback();
      } else {
        // 利用some判断是否部门名重复
        if (!this.currentNode.children) return callback();
        const isReapt = this.currentNode.children.some(
          (item) => item.name === value
        );
        //  如果重复，newError
        isReapt ? callback(new Error("部门重复")) : callback();
      }
    };
    // 校验部门编码是否重复
    const checkoutDeptCode = async (rule, value, callback) => {
      const { depts } = await getTreeDataAPI();
      let isReaptCode;
      if (this.formData.id) {
        isReaptCode = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value);
      } else {
        isReaptCode = depts.some((item) => item.code === value);
      }
      // const isReaptCode = depts.some((item) => item.code === value);
      // 如果重复调用callback(new Error（'错误提示信息）)  否则直接调用回调即可
      isReaptCode ? callback(new Error("部门编码重复！")) : callback();
    };
    return {
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      // 表单校验规则
      formDataRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },

          {
            validator: checkoutDeptName,
            trigger: "blur",
          },
          // validator自定义校验规则，rule当前定义的校验规则，value当前的值，callback回调函数
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          {
            validator: checkoutDeptCode,
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "请输入部门负责人", trigger: "change" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
        ],
      },
      // 员工基本信息列表
      staffList: [],
    };
  },
  computed: {
    activeTitle() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },
  props: {
    visible: {
      type: Boolean,
      required: true, //
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getStaffList();
  },

  methods: {
    async getStaffList() {
      const res = await getStaffListAPI();
      this.staffList = res;
    },
    // 关闭弹层
    onCloseDialog() {
      // 触发修改父组件的方法，改变visible为false
      this.$emit("update:visible", false);
      // 充值整个表单的内容和表单校验规则
      this.$refs.form.resetFields();
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
    },
    async onSave() {
      // 判断id是否存在
      if (this.formData.id) {
        await editDepartInfoAPI(this.formData);
        this.$message.success("编辑成功！");
        // 关闭弹层，并且重新发起获取所有数据的请求，刷新页面
        this.onCloseDialog();
        this.$emit("close");
      } else {
        await this.$refs.form.validate();
        this.formData.pid = this.currentNode.id;
        try {
          console.log(this.formData);
          await addDepartmentAPI(this.formData);
          this.$message.success("新增部门成功！");
          this.onCloseDialog();
          this.$emit("close");
        } catch (error) {
          this.$message.fail("新增部门失败！");
        }
      }
    },
    async getDept(id) {
      const res = await getTreeDataByIdAPI(id);
      this.formData = res;
    },
  },
};
</script>

<style lang="less" scoped></style>
