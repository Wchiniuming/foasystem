import xlsx from 'xlsx'

export const caseFormatValidate = (reader) => {
  // 编译
  const worker = xlsx.read(reader, { type: 'binary' })
  // 转换为json
  const readerSheets = xlsx.utils.sheet_to_json(worker.Sheets[worker.SheetNames[0]])
  let flag = true
  readerSheets.forEach(item => {
    if (item['测试日期'] !== '' && !isDate(item['测试日期'])) {
      console.log(item['用例编号'] + '的测试日期：isDate', isDate(item['测试日期']))
      flag = false
    }
    if (isFormat(item['用例编号'])) {
      console.log(item['用例编号'] + '：格式不正确', isDate(item['测试日期']))
      flag = false
    }
  })
  return flag
}

// 日期格式校验
function isDate (str) {
  const r = /^\d{4}-\d{1,2}-\d{1,2}$/
  const lr = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/
  if (!str || (str && (r.test(str.trim()) || lr.test(str.trim())))) {
    return true
  } else {
    return false
  }
}
// TS00000用例编号格式校验
function isFormat (str) {
  const r = /^TS\d{5}$/
  if (!str || (str && (r.test(str.trim())))) {
    return true
  } else {
    return false
  }
}
