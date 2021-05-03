<template>
  <el-container>
    <el-header >
      <nav-menu :isAdmin='isAdmin' :userName='userName'></nav-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
// import storage from '@/utils/storage'
import NavMenu from '@/components/content/NavMenu'

export default {
  name: 'Main',
  components: {
    NavMenu
  },
  computed: {
    isAdmin () {
      return JSON.parse(sessionStorage.getItem('logonUserRole')).indexOf(1) >= 0
    },
    userName () {
      return this.$store.getters['user/getUserName']
    }
  }
}
</script>

<style scoped>
</style>
