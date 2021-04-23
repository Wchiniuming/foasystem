<template>
  <div class="nav-menu">
    <el-button type='primary' icon="el-icon-switch-button" plain @click="onLogout" style="border-radius: 50%;height: 55px;width: 55px;">
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  methods: {
    onLogout () {}
  }
}
</script>

<style scoped>
  .nav-menu {
    position: fixed;
    right: 10px;
    top: 25px;
  }
</style>
