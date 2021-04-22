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
        <el-col :span='4' style="margin-left: 150px;">
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

export default {
  name: 'ResultUpload',
  data () {
    return {
      projectInfo: {},
      caseData: [],
      // 该数据应通过后端请求得来
      caseInfo: [
        {
          useCaseId: 1,
          useCaseName: 'GSM全球通语音',
          module1: '语音',
          module2: '市话',
          module3: '套内',
          module4: '整分钟',
          purpose: '10',
          beforeTest: '50',
          result: '通过',
          steps: 'lalal',
          expectResult: '111',
          testMan: '11111',
          testTime: '111'
        },
        {
          useCaseId: 2,
          useCaseName: 'GSM全球通语音2',
          module1: '语音2',
          module2: '市话2',
          module3: '套2内',
          module4: '整2分钟',
          productId: '50001001：6063211',
          testPhoneNumber: '18868872260',
          purpose: '102',
          beforeTest: '520',
          result: '不通过',
          steps: '不知道',
          expectResult: '111',
          testMan: '222',
          testTime: '2222'
        }
      ]
    }
  },
  components: {
    CaseDetails
  },
  created () {
    this.projectInfo = JSON.parse(this.$route.params.data)
    this.caseData = this.caseInfo
  }
}
</script>

<style scoped>

</style>
