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
      @multiDownLoad='multiDownLoad'
      @allDownLoad='allDownLoad'
      ></case-details>
  </div>
</template>

<script>
import CaseDetails from '@/components/content/CaseDetails'
import { VendorCaseDetailsHeader } from '@/common/TableHeaders'
import { getCasesByPid } from '@/api/getData'
import { allCasesExport } from '@/api/exportData'
import { casesDownLoad, downloadFile } from '@/utils/download'

export default {
  name: 'CaseDetailsView',
  components: {
    CaseDetails
  },
  data () {
    return {
      caseData: [],
      caseDataBackup: [],
      tableHeaders: VendorCaseDetailsHeader,
      projectId: this.$route.params.projectId

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
        projectId: this.projectId,
        pageNum: 1,
        pageSize: 20
      }
      getCasesByPid(data).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          this.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          this.caseData = res.data.data.list
          this.caseDataBackup = res.data.data.list
        } else {
          this.$message({ message: '数据获取失败', type: 'error' })
          console.log('网络请求异常', res.data)
        }
      }).catch(err => {
        this.$message({ message: '网络请求异常，请稍后再试！', type: 'error' })
        console.log('网络请求异常', err)
      })
    },
    // 下载选中用例
    multiDownLoad (selectedCases) {
      casesDownLoad(selectedCases, this)
    },
    // 下载全量用例
    allDownLoad () {
      allCasesExport(this.projectId).then(res => {
        const fileName = '所有测试用例'
        downloadFile(res.data, fileName, '.xls')
      }).catch(err => {
        this.$message({ message: '下载请求失败，请检查网络或稍后再试！', type: 'error' })
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
