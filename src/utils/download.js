import { useCasesExport } from '@/api/exportData'

export function downloadFile (res, name, type) {
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // msSaveOrOpenBlob：提供保存和打开按钮
    const fileName = name + type;
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const fileName = name + type;
    const elink = document.createElement('a');
    elink.style.display = 'none';
    // elink.href = URL.revokeObjectURL(blob);
    elink.href = URL.createObjectURL(blob);
    elink.download = fileName;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
  }
}

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
