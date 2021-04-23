<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  <nav-menu v-if="logon"></nav-menu>
  </el-container>
</template>

<script>
import NavMenu from '@/components/content/NavMenu'

export default {
  name: 'App',
  components: {
    NavMenu
  },
  data () {
    return {
      logon: false
    }
  }
}
</script>

<style>
@import url('/@/assets/css/normalize.css');
</style>
