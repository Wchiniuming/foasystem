<template>
  <el-form :model="systemInfo" ref="systemInfo" label-width="120px">
    <el-form-item label="名称" prop="systemName">
      <el-input value="systemInfo.systemName"></el-input>
    </el-form-item>
    <el-form-item label="厂商" prop="vendorName">
      <el-input value="systemInfo.vendorName"></el-input>
    </el-form-item>
    <el-form-item label="待上线省份" prop="province">
      <el-input value="systemInfo.province"></el-input>
    </el-form-item>
    <el-form-item label="测试系统" prop="province">
      <el-input value="systemInfo.province"></el-input>
    </el-form-item>
    <el-form-item label="待上线省份" prop="province">
      <el-input value="systemInfo.province"></el-input>
    </el-form-item>
    <el-form-item label="待上线省份" prop="province">
      <el-input value="systemInfo.province"></el-input>
    </el-form-item>
    <el-form-item label="附件">
      <div class="annex" v-for="annex in systemInfo.annexes" :key="annex.name">
        <label>{{annex.name}}</label>
        <el-button type='text' @click="doCancel('createForm')">下载</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SystemInfo',
  date () {
    return {
      systemInfo: []
    }
  }
}
</script>

<style scoped>

</style>