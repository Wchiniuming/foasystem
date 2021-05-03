import axios from 'axios'

export const updataPorject = (projectInfo) => {
  return axios({
    method: 'post',
    url: '/api/projects/update',
    data: projectInfo
  })
}

export const updateCase = (useCaseInfo) => {
  return axios({
    method: 'post',
    url: '/api/useCase/update',
    data: useCaseInfo
  })
}
