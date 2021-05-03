import axios from 'axios'

export const useCasesExport = (useCasesId) => {
  return axios({
    method: 'post',
    url: '/api/useCase/export',
    data: useCasesId,
    responseType: 'blob'
  })
}
