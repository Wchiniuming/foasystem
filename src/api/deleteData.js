/* eslint dot-notation: 0 */
import axios from 'axios'

export const deleteProjectById = (projectId) => {
  return axios({
    method: 'delete',
    url: '/api/projects/del/' + projectId
  })
}

export const deleteCaseById = (casesId) => {
  return axios({
    method: 'delete',
    url: '/api/useCase/del',
    data: casesId
  })
}
