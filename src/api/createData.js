/* eslint dot-notation: 0 */
import axios from 'axios'
var FormData = require('form-data')

export const createProject = (data) => {
  return axios({
    method: 'post',
    url: '/api/projects/new',
    data: data
  })
}

export const uploadFiles = (projectId, fileList) => {
  var fileData = new FormData()
  fileList.forEach(file => {
    fileData.append('files', file)
  });
  console.log(fileList)
  return axios({
    method: 'post',
    url: '/api/files/upload/' + projectId,
    data: fileData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
