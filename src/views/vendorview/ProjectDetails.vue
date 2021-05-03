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
          <div v-if="annexes.length>0">
            <div v-for="file in annexes" :key="file.fileName">
              <ul style="list-style: none;">
                <li>
                  <span style="margin-right: 10px">{{file.fileName}}</span>
                  <el-button type='text' @click="doDownload(file.fileName)">下载</el-button>
                </li>
              </ul>
            </div>
          </div>
          <span v-else style="color: red">项目无附件</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getProjectAnnexes } from '@/api/getData'

export default {
  name: 'ProjectDetails',
  data () {
    return {
      projectInfo: {},
      annexes: []
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    doDownload (name) {
      // 文件下载
    },
    getData () {
      // 获取项目详情，并初始化
      if (this.$route.params.data) {
        this.projectInfo = JSON.parse(this.$route.params.data)
      } else if (sessionStorage.getItem('projectInfo')) { // 应对页面刷新的情况，从缓存中读取数据
        this.projectInfo = JSON.parse(sessionStorage.getItem('projectInfo'))
      }
      // 根据projectId获取项目的附件信息
      getProjectAnnexes(this.projectInfo.projectId).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.annexes = res.data.data
        } else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        this.$message({ message: '附件信息网络请求异常！', type: 'error' })
        console.log('附件信息网络请求异常！', err)
      })
    }
  },
  beforeMount () {
    this.getData()
    // 添加刷新前的监听函数，缓存项目数据
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('projectInfo', JSON.stringify(this.projectInfo))
    })
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
