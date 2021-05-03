/* eslint dot-notation: 0 */
import axios from 'axios'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/api/login',
    params: {
      username: data.userName,
      password: data.passWord
    }
  })
}

export const logout = () => {
  return axios({
    method: 'get',
    url: '/api/logout'
  })
}
