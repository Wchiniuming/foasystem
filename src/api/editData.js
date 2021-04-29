import axios from 'axios'

export const updataPorject = (projectInfo) => {
  return axios({
    method: 'post',
    url: '/api/projects/update',
    data: projectInfo
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}
