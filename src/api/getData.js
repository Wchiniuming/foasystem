/* eslint dot-notation: 0 */
import axios from 'axios'

export const getProjectData = (data) => {
  return axios({
    method: 'post',
    url: '/api/projects/list',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    },
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      project: data.projectInfo
    }
  })
}
