export function upload (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}
