import { useCasesExport } from '@/api/exportData'
import { downloadFile } from '@/utils/export'

export const casesDownLoad = (selectedCases, thisis) => {
  if (selectedCases.length === 0) {
    thisis.$message({ message: '请选择要下载的用例！', type: 'error' })
    return
  }
  const casesId = selectedCases.map(item => {
    return item.useCaseId
  })
  useCasesExport(casesId).then(res => {
    const fileName = '导出的测试用例'
    downloadFile(res.data, fileName, '.xls')
  }).catch(err => {
    thisis.$message({ message: '下载请求失败,检查网络或稍后再试！', type: 'error' })
    console.log(err)
  })
}
