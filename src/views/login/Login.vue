<template>
  <div class="login-form">
    <el-form ref="loginForm"
      :model="loginForm"
      :rules='rules'
      label-width="120px"
      style="background-color: rgba(179, 192, 192, 0.35); border-radius: 38px; padding-right: 50px; width:30%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
    <h2 class="header" style="text-align: center">FOA系统</h2>
    <h4 class="header" style="text-align: center">用户登录</h4>
      <el-form-item label="用户名" prop='userName'>
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop='passWord'>
        <el-input type="passWord" v-model="loginForm.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角 色" prop='role'>
        <el-radio-group v-model="loginForm.role">
          <el-radio :label="4">省公司</el-radio>
          <el-radio :label="3">测试人员</el-radio>
          <el-radio :label="2">厂商</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item class="control-bt">
        <el-button type="primary" size='medium' @click="onLogin('loginForm')" style="margin-right: 50px;">登 录</el-button>
        <el-button type='info' size='medium' large plain @click="onReset('loginForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginFormRule } from '@/common/FormRules'
import { login } from '@/api/login'
import storage from '@/utils/storage'

export default {
  name: 'LoginWindows',
  data () {
    return {
      loginForm: {
        userName: '',
        passWord: ''
      },
      rules: loginFormRule
    }
  },
  methods: {
    onLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.loginForm
          login(data).then(res => {
            if (res.data.code === 200) {
              // 获取角色代表id，存储在数组中
              const logonUserRole = []
              res.data.data.forEach(role => {
                logonUserRole.push(role.id)
              })
              // 将角色信息存在localStorage中
              storage.set('logonUserRole', logonUserRole)// 后续应将其替换，存在在vuex中的权限模块中
              // 根据角色判定跳转不同路径
              if (logonUserRole.indexOf(1) >= 0) {
                this.$router.push({
                  name: 'projectList'
                }) // 管理员
              } else if (logonUserRole.indexOf(2) >= 0) {
                this.$router.push({
                  name: 'projectList'
                }) // 厂商
              } else if (logonUserRole.indexOf(3) >= 0) {
                this.$router.push({
                  name: 'casesMaintain'
                }) // 测试人员
              } else if (logonUserRole.indexOf(4) >= 0) {
                this.$router.push({
                  name: 'provinceMainView'
                }) // 省公司
              }
              console.log(res.data.msg)
            } else {
              console.log(res.data.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
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
    margin-left: 50px;
  }
  .control-bt {
    margin-top: 50px;
    text-align: center;
    margin-left: -50px;
  }
  /* html {
    background-image: url('../../assets/image/login.jpeg')
  } */
  /* label.el-form-item__label, .el-radio__label {
    color: white;
  } */
</style>
