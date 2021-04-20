<!--
 * @Author: your name
 * @Date: 2021-04-19 17:17:42
 * @LastEditTime: 2021-04-20 10:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workspace\foasystem\src\views\vendorview\ProjectDetails.vue
-->
<template>
  <div width='100%'>
    <el-button icon="el-icon-back" circle @click="goBack"></el-button>
    <div class="projectDetails">
      <div class="header">
        <h2>【{{projectInfo.projectName}}】详情</h2>
      </div>
      <hr style="border: 2px solid gray; width: 40%; margin-bottom: 20px;">
      <el-form label-width="120px" style="text-align: center; width: 40%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-form-item label="项目名称:">
          <span width='250px'>
            <label class="projectItem">{{projectInfo.projectName}}</label>
          </span>
        </el-form-item>
        <el-form-item label="厂商:">
          <label class="projectItem">{{projectInfo.vendorName}}</label>
        </el-form-item>
        <el-form-item label="待上线省份:">
          <label class="projectItem">{{projectInfo.province}}</label>
        </el-form-item>
        <el-form-item label="测试系统:">
          <label class="projectItem">{{projectInfo.targetSystem}}</label>
        </el-form-item>
        <el-form-item label="系统类型:">
          <label class="projectItem">{{projectInfo.systemType}}</label>
        </el-form-item>
        <el-form-item label="紧急程度:" style="font-weight: bolder;">
          <label class="projectItem">{{projectInfo.emergencyLevel}}</label>
        </el-form-item>
        <el-form-item label="附件:">
          <div v-for="annex in projectInfo.annexes" :key="annex.name">
            <ul style="list-style: none;">
              <li>
                <span style="margin-right: 10px">{{annex.name}}</span>
                <el-button type='text' @click="doDownload(annex.name)">下载</el-button>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetails',
  data () {
    return {
      projectInfo: {},
      projectDt: {
        projectName: '测试项目1',
        vendorName: '厂商1',
        province: '省公司1',
        targetSystem: '系统1',
        systemType: 'BOSS',
        emergencyLevel: '紧急',
        annexes: [
          {
            name: '1.山东BOSS升级说明.docx',
            type: 'docx'
          },
          {
            name: '2.山东BOSS升级说明2.docx',
            type: 'docx'
          }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  beforeMount () {
    this.projectInfo = this.projectDt
  }
}
</script>

<style scoped>
  .projectDetails {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -40px;
  }
  .projectItem {
    width: 250px;
  }
  .header {
    width: 40%;
    vertical-align: middle;
    text-align: center;
  }
</style>
