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
    // headers: {
    //   Authorization: this.$store.user.getToken,
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}

export const logout = () => {
  return axios({
    method: 'get',
    url: '/api/logout'
  })
}
