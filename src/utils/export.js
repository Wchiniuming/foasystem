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
