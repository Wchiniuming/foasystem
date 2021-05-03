import { deleteCaseById } from '@/api/deleteData'

export const casesDelete = (selectedCases, propsData, backupData, thisis) => {
  if (selectedCases.length !== 0) {
    thisis.$confirm('请确认是否删除？').then(() => {
      const casesId = selectedCases.map(item => {
        return item.useCaseId
      })
      deleteCaseById(casesId).then(res => {
        if (res.data.code === 2001 || res.data.code === 2009) {
          thisis.$alert('账号超时，请重新登录！', '超时', {
            confirmButtonText: 'OK',
            callback: () => {
              thisis.$router.replace('/login')
            }
          })
        }
        if (res.data.code === 200) {
          // 后台删除请求成功后，删除本地数据
          selectedCases.forEach(item => {
            backupData.splice(backupData.indexOf(item), 1)
          })
          propsData = backupData
          thisis.$message({ message: '批量删除成功！', type: 'success' })
        } else {
          thisis.$message({ message: '批量删除失败', type: 'error' })
          console.log(res)
        }
      }).catch(err => {
        thisis.$message({ message: '删除请求失败', type: 'error' })
        console.log('删除请求失败', err)
      })
    }).catch(() => {})
  } else {
    thisis.$message(
      {
        message: '请选择要删除的数据！',
        type: 'error'
      }
    )
  }
}
