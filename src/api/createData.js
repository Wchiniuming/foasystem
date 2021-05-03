/* eslint dot-notation: 0 */
import axios from 'axios'

export const createProject = (data) => {
  return axios({
    method: 'post',
    url: '/api/projects/new',
    data: data
  })
}

export const uploadFiles = (data) => {
  return axios({
    method: 'post',
    url: '/api/files/upload/' + data.projectId,
    data: data.files
  })
}
