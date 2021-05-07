import axios from 'axios'
var FormData = require('form-data')
var data = new FormData()

export const casesImport = (projectId, file) => {
  data.append('useCaseFile', file)
  return axios({
    method: 'post',
    url: '/api/useCase/import/' + projectId,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
