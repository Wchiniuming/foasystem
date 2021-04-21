<template>
  <div>
    <search-container>
      <template v-slot:queryCd>
        <el-form :inline="true" :model="caseQueryForm" ref='caseQueryForm' class="caseQuery-form">
          <el-form-item label='产品名称'>
            <el-input v-model="caseQueryForm.productName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label='资费描述'>
            <el-input v-model="caseQueryForm.tariffDesc" placeholder="资费描述" clearable></el-input>
          </el-form-item>
          <el-form-item label='测试号码'>
            <el-input v-model="caseQueryForm.testPhoneNumber" placeholder="测试号码" clearable></el-input>
          </el-form-item>
          <el-form-item label='测试结果'>
            <el-input v-model="caseQueryForm.testResult" placeholder="测试结果" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon='el-icon-search' @click="onQuery('caseQueryForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
    </search-container>
    <div class="downLoadBt">
      <el-button type='text' @click="multiDownLoad">批量下载</el-button>
      <el-button type='text' @click="allDownLoad">下载全部用例</el-button>
    </div>
    <table-list
      :tableHeaders='tableHeaders'
      :tableData='caseDataProps'
      :selectable='true'
      @multiSelect='selectCases'
    ></table-list>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer'
import TableList from '@/components/common/TableList'
import { CaseDetailsHeader } from '@/common/TableHeaders'

export default {
  name: 'CaseDetails',
  components: {
    SearchContainer,
    TableList
  },
  data () {
    return {
      tableHeaders: [],
      caseData: [
        {
          sn: 1,
          productName: 'GSM全球通语音',
          tariffDesc: '国内时长150分钟，主叫长市漫一口价0.4元/分钟（不含港澳台）',
          subSceneOne: '语音',
          subSceneTwo: '市话',
          subSceneThree: '套内',
          subSceneFour: '整分钟',
          productId: '50001001：6063211',
          testPhoneNumber: '18868878260',
          callingTime: '10',
          initialTariff: '50',
          testResult: '通过',
          noPassReason: '',
          remarks: ''
        },
        {
          sn: 2,
          productName: 'GSM全球通语音2',
          tariffDesc: '国内时长150分钟2，主叫长市漫一口价0.4元/分钟（不含港澳台）',
          subSceneOne: '语音2',
          subSceneTwo: '市话2',
          subSceneThree: '套2内',
          subSceneFour: '整2分钟',
          productId: '50001001：6063211',
          testPhoneNumber: '18868872260',
          callingTime: '102',
          initialTariff: '520',
          testResult: '不通过',
          noPassReason: '不知道',
          remarks: ''
        }
      ],
      caseDataProps: [],
      caseQueryForm: {
        productName: '',
        tariffDesc: '',
        testPhoneNumber: '',
        testResult: ''
      },
      selectedCases: []
    }
  },
  methods: {
    selectCases (selectedValue) {
      this.selectedCases = selectedValue
      console.log(this.selectedCases)
    },
    multiDownLoad () {},
    allDownLoad () {},
    onQuery (formName) {
      const qf = this.caseQueryForm
      if (Object.keys(qf).length === 0) {
        this.caseDataProps = this.caseData
      } else {
        this.caseDataProps = this.caseData.filter(
          casesItem => {
            return casesItem.productName.match(qf.productName) &&
            casesItem.tariffDesc.match(qf.tariffDesc) &&
            casesItem.testPhoneNumber.match(qf.testPhoneNumber) &&
            casesItem.testResult.match(qf.testResult)
          }
        )
      }
    }
  },
  created () {
    this.tableHeaders = CaseDetailsHeader
    this.caseDataProps = this.caseData
    // 根据路由中携带的参数，到后端查询指定项目的用例数据，赋值给this.caseData
  }
}
</script>

<style scoped>

</style>
