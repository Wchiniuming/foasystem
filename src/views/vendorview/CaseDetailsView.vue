<template>
  <div>
    <case-details
      :search='true'
      :caseDataResource='caseData'
      :allDownL='true'
      :multiDownL='true'
      ></case-details>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'

export default {
  name: 'CaseDetailsView',
  components: {
    CaseDetails
  },
  data () {
    return {
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
  created () {
    // this.tableHeaders = CaseDetailsHeader
    this.caseData = this.caseInfo
    // 根据路由中携带的参数，到后端查询指定项目的用例数据，赋值给this.caseData
  }
}
</script>

<style scoped>

</style>
