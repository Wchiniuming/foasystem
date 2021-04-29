<template>
  <div>
    <div class="project-info">
      <div class="header" style="text-align: center; width: 27%">
        <h2>{{projectInfo.projectName}}测试结果</h2>
        <h5>项目基本信息</h5>
      </div>
      <el-form label-width="120px">
        <el-col :span='5'>
          <el-form-item label="项目名称:">
            <span width='250px'>
              <label class="projectItem">{{projectInfo.projectName}}</label>
            </span>
          </el-form-item>
        </el-col>
        <el-col :span='5'>
            <el-form-item label="厂商:">
            <label class="projectItem">{{projectInfo.company}}</label>
          </el-form-item>
        </el-col>
        <el-col :span='5'>
          <el-form-item label="测试产品:">
            <label class="projectItem">{{projectInfo.productName}}</label>
          </el-form-item>
        </el-col>
        <el-col :span='5'>
          <el-form-item label="紧急程度:">
            <label class="projectItem">{{projectInfo.projectLevel}}</label>
          </el-form-item>
        </el-col>
        <el-col :span='4' style="margin-left: 150px;" v-if="isTester">
          <el-button type='primary'>测试结果上传</el-button>
        </el-col>
      </el-form>
    </div>
    <div class="case-details">
      <case-details
        :caseDataResource='caseInfo'
        :multiDownL='true'
        :multiDel='true'
        ></case-details>
    </div>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { getCasesByPid } from '@/api/getData'
import storage from '@/utils/storage'

export default {
  name: 'ResultUpload',
  data () {
    return {
      projectInfo: {},
      // 该数据应通过后端请求得来
      caseInfo: []
    }
  },
  components: {
    CaseDetails
  },
  computed: {
    isTester () {
      return storage.get('logonUserRole').indexOf(5) >= 0
    }
  },
  methods: {
    getData () {
      const data = {
        projectId: this.$route.params.projectId,
        pageNum: 1,
        pageSize: 20
      }
      getCasesByPid(data).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          alert('账号超时，请重新登录！')
          this.$router.replace('/login')
        }
        if (res.data.code === 200) {
          this.caseInfo = res.data.data.list
          console.log('数据获取成功', res.data.msg)
        } else {
          console.log('数据获取失败', res)
        }
      }).catch(err => {
        alert('网络请求异常，请稍后再试！')
        console.log('网络请求异常', err)
      })
    }
  },
  created () {
    this.projectInfo = JSON.parse(this.$route.params.data)
    this.getData()
  }
}
</script>

<style scoped>

</style>
