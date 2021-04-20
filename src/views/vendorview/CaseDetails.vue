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
            <el-input v-model="caseQueryForm.phoneNumber" placeholder="测试号码" clearable></el-input>
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
      :tableData='caseData'
      :selectable='true'
      @multiSelect='selectCases'
    ></table-list>
  </div>
</template>

<script>
import SearchContainer from '@/components/common/SearchContainer'
import TableList from '@/components/common/TableList'

export default {
  name: 'CaseDetails',
  components: {
    SearchContainer,
    TableList
  },
  data () {
    return {
      tableHeaders: [
        {
          key: 'sn',
          name: '序号'
        },
        {
          key: 'productName',
          name: '产品名称'
        },
        {
          key: 'tariffDesc',
          name: '资费描述'
        },
        {
          key: 'subSceneOne',
          name: '子场景一'
        },
        {
          key: 'subSceneTwo',
          name: '子场景二'
        },
        {
          key: 'subSceneThree',
          name: '子场景三'
        },
        {
          key: 'subSceneFour',
          name: '子场景四'
        },
        {
          key: 'productId',
          name: '产品ID'
        },
        {
          key: 'testPhoneNumber',
          name: '测试号码'
        },
        {
          key: 'callingTime',
          name: '话单时长'
        },
        {
          key: 'initialTariff',
          name: '免费资费初始值'
        },
        {
          key: 'testResult',
          name: '测试结果'
        },
        {
          key: 'noPassReason',
          name: '测试失败原因'
        },
        {
          key: 'remarks',
          name: '备注'
        }
      ],
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
      caseQueryForm: {
        productName: '',
        tariffDesc: '',
        phoneNumber: '',
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
    allDownLoad () {}
  }
}
</script>

<style scoped>

</style>
