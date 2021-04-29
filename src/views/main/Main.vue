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
import storage from '@/utils/storage'
import NavMenu from '@/components/content/NavMenu'

export default {
  name: 'Main',
  components: {
    NavMenu
  },
  computed: {
    isAdmin () {
      return storage.get('logonUserRole').indexOf(1) >= 0
    },
    userName () {
      return this.$route.params.userName
    }
  }
}
</script>

<style scoped>
</style>
