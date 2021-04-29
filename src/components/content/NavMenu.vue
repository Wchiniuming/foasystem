<template>
  <div class="nav-menu">
    <el-menu v-if="isAdmin" :default-active="index" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">项目管理</el-menu-item>
      <el-menu-item index="2">用例管理</el-menu-item>
      <el-menu-item index="3">通用配置管理</el-menu-item>
      <el-menu-item style="position: absolute; right: 0px;">
        <el-avatar icon="el-icon-user-solid" style="padding-left: 4px"></el-avatar>
        <span style="text-align: center; margin: 0 20px;">{{userName}}</span>
        <el-button type='text'
          icon="el-icon-switch-button"
          @click="onLogout"
          >
          退出系统
        </el-button>
      </el-menu-item>
    </el-menu>
    <div v-else class="normailHeader">
      <el-col :span='20' style="width: 100%">
        <h3>您好，欢迎访问业支FOA流程管理系统</h3>
      </el-col>
      <el-col :span='4' style="width: 100%" class="right">
        <el-avatar icon="el-icon-user-solid" style="margin-right: -20px;"></el-avatar>
        <span style="text-align: center; margin: 0 20px;">{{userName}}</span>
        <el-button type='text'
          icon="el-icon-switch-button"
          @click="onLogout"
          >
          退出系统
        </el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import { logout } from '@/api/login'

export default {
  name: 'NavMenu',
  data () {
    return {
      index: '1'
    }
  },
  props: {
    userName: {
      type: String,
      default: ''
    },
    isAdmin: Boolean
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push({ name: 'adminMainView' })
      }
      if (key === '2') {
        this.$router.push({ name: 'testerMainView' })
      }
      if (key === '3') {
        this.$router.push({ name: 'adminMainView' }) // 通用配置视图，待开发
      }
    },
    onLogout () {
      // 清除登录状态
      logout().then(res => {
        if (res.data.code === 200) {
          console.log('退出登录成功', res)
          storage.remove('logonUserRole')
          this.$router.replace('/login')
        } else {
          console.log('退出失败', res)
        }
      }).catch(err => {
        console.log('退出请求失败', err)
      })
    }
  }
}
</script>

<style scoped>
  .normailHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .right {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
</style>
