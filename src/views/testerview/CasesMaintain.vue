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
      @caseQuery='doCaseQuery'
    ></case-details>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { casesMaintainHeaders } from '@/common/TableHeaders'
import { getCasesByPid } from '@/api/getData'

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
      caseData: []
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
          this.caseData = this.caseInfo
          console.log('数据获取成功', res.data.msg)
        } else {
          console.log('数据获取失败', res)
        }
      }).catch(err => {
        alert('网络请求异常，请稍后再试！')
        console.log('网络请求异常', err)
      })
    },
    doCaseQuery (queryForm) {
      if (queryForm.useCaseName.length === 0 && queryForm.module1.length === 0 && queryForm.module2.length === 0 && queryForm.purpose.length === 0 && queryForm.expectResult.length === 0) {
        this.caseInfo = this.caseData
      } else {
        this.caseInfo = this.caseData.filter(
          casesItem => {
            return casesItem.useCaseName.match(queryForm.useCaseName) &&
            casesItem.module1.match(queryForm.module1) &&
            casesItem.module2.match(queryForm.module2) &&
            casesItem.purpose.match(queryForm.purpose) &&
            casesItem.expectResult.match(queryForm.expectResult)
          }
        )
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
