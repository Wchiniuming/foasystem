<template>
  <div>
    <case-details
      :search='true'
      :controlType='controlType'
      :tableHeadersProps='tableHeaders'
      :caseDataResource='caseInfo'
      :multiDownL='true'
      :multiDel='true'
      :caseUpl='true'
      :modelDl='true'
    ></case-details>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { casesMaintainHeaders } from '@/common/TableHeaders'

export default {
  name: 'CasesMaintain',
  components: {
    CaseDetails
  },
  data () {
    return {
      controlType: 'editAndDelete',
      tableHeaders: casesMaintainHeaders,
      caseInfo: [],
      caseData: [
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
          expectResult: '111'
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
          expectResult: '111'
        }
      ]
    }
  },
  created () {
    this.caseInfo = this.caseData
  }
}
</script>

<style scoped>

</style>
