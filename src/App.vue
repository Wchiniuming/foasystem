<template>
  <el-container>
    <el-aside style="width: 5%">
      <div>
        <router-link to='/vendor'>厂商</router-link>
      </div>
      <!-- <div>
        <router-link to='/tester'>测试方</router-link>
      </div>
      <div>
        <router-link to='/provice'>省公司</router-link>
      </div> -->
    </el-aside>
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
@import url('/src/assets/css/normalize.css');

.el-aside {
  padding-top: 10px;
  padding-left: 10px;
  line-height: 35px;
}
</style>
