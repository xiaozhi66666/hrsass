<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <!-- 放置标题图片 @是设置的别名-->
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <!-- 表单区域 -->
      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-container"></i>
        <el-input v-model="loginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="svg-container"><svg-icon iconClass="password"></svg-icon> </i>
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="loginBtn"
        style="width: 100%; margin-bottom: 30px"
        @click="login"
        :loading="loading"
        >Login</el-button
      >
      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 接收输入框的对象
      loginForm: {
        mobile: "13800000002",
        password: "123456",
      },
      // 定义校验规则
      loginFormRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确格式手机号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // {
          //   pattern:
          //     /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
          //   trigger: "blur",
          //   message:
          //     "请输入至少含有一位数字/字母/特殊字符，且长度不少于6位的密码",
          // },
        ],
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      // 判断表单是否已经校验通过,通过el-form的自带方法进行判断
      // 1：通过访问form中的validate((result)=>{})方法进行判断
      // 2：该方法返回promise，直接try/catch进行捕获结果判断
      this.$refs.loginForm.validate(async (result) => {
        try {
          if (!result) {
            return;
          }
          // 表单校验通过后将获取到的账号密码信息提交到user模块中的actions中触发产生api请求，获取token
          await this.$store.dispatch("user/getToken", this.loginForm);
          // 成功后跳转到首页
          this.$router.push("/");
          this.$message.success("登录成功！");
        } finally {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item__error {
    color: #fff;
  }
  // 修改按钮样式
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("~@/assets/common/login.jpg");
  background-position: center; //将图片撑满整个屏幕
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
