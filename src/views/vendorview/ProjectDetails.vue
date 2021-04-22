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
          <label class="projectItem">{{projectInfo.company}}</label>
        </el-form-item>
        <el-form-item label="待上线省份:">
          <label class="projectItem">{{projectInfo.province}}</label>
        </el-form-item>
        <el-form-item label="测试产品:">
          <label class="projectItem">{{projectInfo.productName}}</label>
        </el-form-item>
        <el-form-item label="接口人信息:">
          <label class="projectItem">{{projectInfo.contactMan}}</label>
        </el-form-item>
        <el-form-item label="紧急程度:" style="font-weight: bolder;">
          <label class="projectItem">{{projectInfo.projectLevel}}</label>
        </el-form-item>
        <el-form-item label="附件:">
          <div v-for="file in annexes" :key="file.fileName">
            <ul style="list-style: none;">
              <li>
                <span style="margin-right: 10px">{{file.fileName}}</span>
                <el-button type='text' @click="doDownload(file.fileName)">下载</el-button>
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
        company: '厂商1',
        province: '省公司1',
        productName: '产品1',
        contactMan: '接口人',
        projectLevel: '紧急'
      },
      // 附件的数据，通过projectId发送请求，到后端获取
      annexes: [
        {
          projectId: '1',
          fileName: '1.山东BOSS升级说明.docx'
        },
        {
          projectId: '2',
          fileName: '2.山东BOSS升级说明2.docx'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    doDownload (name) {
      // 文件下载
    }
  },
  created () {
    // 从路由中获取projectId，请求获取相应的附件列表，并赋值给annexes
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
