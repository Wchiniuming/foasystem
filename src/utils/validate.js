import xlsx from 'xlsx'

export const caseFormatValidate = (reader) => {
  // 编译
  const worker = xlsx.read(reader, { type: 'binary' })
  // 转换为json
  const readerSheets = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]])
  let ckCid = true
  let ckDtime = true
  readerSheets.forEach(item => {
    if (isNotNull(item['用例编号'])) {
      console.log(item['用例编号'])
      console.log('isNotNull', isNotNull(item['用例编号']))
      ckCid = false
    }
    if (item['测试日期'] !== '' && !isDate(item['测试日期'])) {
      console.log('isDate', isDate(item['测试日期']))
      ckDtime = false
    }
  })
  return ckCid && ckDtime
}

function isDate (str) {
  var r = /^\d{4}-\d{1,2}-\d{1,2}$/
  var lr = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/
  if (r.test(str.trim()) || lr.test(str.trim())) {
    return true
  } else {
    return false
  }
}

function isNotNull (str) {
  if (str && str !== '') {
    return true
  } else {
    return false
  }
}
