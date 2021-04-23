<template>
  <div class="login-form">
    <el-form ref="loginForm"
      :model="loginForm"
      :rules='rules'
      label-width="120px"
      style="background-color: rgba(179, 192, 192, 0.35); border-radius: 38px; color: white; ; padding-right: 50px; width:30%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
    <h2 class="header" style="text-align: center">用户登录</h2>
      <el-form-item label="用户名" prop='userName'>
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop='password'>
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角  色" prop='roleName'>
        <el-radio-group v-model="loginForm.roleName" size="small">
          <el-radio border label="厂商"></el-radio>
          <el-radio border label="测试人员"></el-radio>
          <el-radio border label="省公司"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="control-bt">
        <el-button type="primary" @click="onLogin('loginForm')" style="margin-right: 50px;">登 录</el-button>
        <el-button type='info' plain @click="onReset('loginForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginFormRule } from '@/common/FormRules'

export default {
  name: 'LoginWindows',
  data () {
    return {
      loginForm: {
        userName: '',
        password: '',
        roleName: ''
      },
      rules: loginFormRule
    }
  },
  methods: {
    onLogin () {
      console.log('login!');
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style >
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin-left: -50px;
  }
  .header {
    margin-bottom: 80px;
    margin-left: 50px;
  }
  .control-bt {
    margin-top: 50px;
    text-align: center;
    margin-left: -50px;
  }
  html {
    background-image: url('../../assets/image/login.jpeg')
  }
  label.el-form-item__label, .el-radio__label {
    color: white;
  }
</style>
