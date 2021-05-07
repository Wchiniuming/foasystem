<template>
  <el-container>
    <el-main>
      <div class="login-form">
        <el-form ref="loginForm"
          :model="loginForm"
          :rules='rules'
          label-width="80px"
          @keyup.enter="onLogin('loginForm')"
          style="background-color: rgba(179, 192, 192, 0.35); border-radius: 38px; padding-right: 80px; width:24%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
        <h2 class="header" style="text-align: center">业支FOA流程管理系统</h2>
        <h4 class="header" style="text-align: center">用户登录</h4>
          <el-form-item prop='userName'>
            <el-input prefix-icon="el-icon-user-solid" v-model.trim="loginForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop='passWord'>
            <el-input prefix-icon="el-icon-lock" type="passWord" v-model.trim="loginForm.passWord" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="control-bt">
            <el-button type="primary" size='medium' @click="onLogin('loginForm')" style="font-size: 18px;width: 85%">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { loginFormRule } from '@/common/FormRules'
import { login } from '@/api/login'
// import storage from '@/utils/storage'

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
              // 将角色信息存在sessionStorage中
              sessionStorage.setItem('logonUserRole', JSON.stringify(logonUserRole))// 后续应将其替换，存在在vuex中的权限模块中
              this.$store.commit('user/initUserData', { userName: this.loginForm.userName })
              // 根据角色判定跳转不同路径
              if (logonUserRole.indexOf(1) >= 0) {
                this.$router.push({
                  name: 'adminMainView'
                }) // 管理员
              } else if (logonUserRole.indexOf(3) >= 0) {
                this.$router.push({
                  name: 'vendorMainView'
                }) // 厂商
              } else if (logonUserRole.indexOf(5) >= 0) {
                this.$router.push({
                  name: 'testerMainView'
                }) // 测试人员
              } else if (logonUserRole.indexOf(4) >= 0) {
                this.$router.push({
                  name: 'provinceMainView'
                }) // 省公司
              }
            } else {
              this.$message({ message: '登录失败', type: 'error' })
              console.log('登录失败', res.data.msg)
            }
          }).catch(err => {
            this.$message({ message: '网络请求异常,请检查网络或稍后再试！', type: 'error' })
            console.log('网络请求异常', err)
          })
        }
      })
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
    margin: 40px 0;
    text-align: center;
  }
</style>
