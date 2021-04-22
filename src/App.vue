<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('/@/assets/css/normalize.css');

.el-aside {
  padding-top: 10px;
  padding-left: 10px;
  line-height: 35px;
}
</style>
