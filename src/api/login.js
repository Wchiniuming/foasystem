/* eslint dot-notation: 0 */
import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.43.164'
// axios.defaults.headers.common['Authorization'] = this.$store.user.getToken
// axios.defaults.headers.post['Content-Type'] = 'application/json'

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
