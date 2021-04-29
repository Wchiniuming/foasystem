<template>
  <div>
    <case-details
      :search='true'
      :caseDataResource='caseData'
      :tableHeadersProps='tableHeaders'
      :allDownL='true'
      :multiDownL='true'
      :vendor='true'
      @caseQuery='doCaseQuery'
      ></case-details>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { VendorCaseDetailsHeader } from '@/common/TableHeaders'
import { getCasesByPid } from '@/api/getData'

export default {
  name: 'CaseDetailsView',
  components: {
    CaseDetails
  },
  data () {
    return {
      caseData: [],
      caseDataBackup: [],
      tableHeaders: VendorCaseDetailsHeader
    }
  },
  created () {
    this.getData()
  },
  methods: {
    doCaseQuery (queryForm) {
      console.log(this.caseDataBackup)
      if (queryForm.useCaseName.length === 0 && queryForm.module1.length === 0 && queryForm.module2.length === 0 && queryForm.purpose.length === 0 && queryForm.expectResult.length === 0) {
        this.caseData = this.caseDataBackup
      } else {
        this.caseData = this.caseDataBackup.filter(
          casesItem => {
            return casesItem.useCaseName.match(queryForm.useCaseName) &&
            casesItem.module1.match(queryForm.module1) &&
            casesItem.module2.match(queryForm.module2) &&
            casesItem.purpose.match(queryForm.purpose) &&
            casesItem.expectResult.match(queryForm.expectResult)
          }
        )
      }
    },
    getData () {
      const data = {
        projectId: this.$route.params.projectId,
        pageNum: 1,
        pageSize: 20
      }
      getCasesByPid(data).then(res => {
        if (res.data.code === 200) {
          this.caseData = res.data.data.list
          this.caseDataBackup = res.data.data.list
          console.log('数据获取成功', this.caseData)
        }
      }).catch(err => {
        alert('网络请求异常，请稍后再试！')
        console.log('网络请求异常', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
