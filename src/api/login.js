/* eslint dot-notation: 0 */
import axios from 'axios'
import storage from '@/utils/storage'

axios.defaults.baseURL = 'http://192.168.207.54'
// axios.defaults.headers.common['Authorization'] = this.$store.user.getToken
// axios.defaults.headers.post['Content-Type'] = 'application/json'

export const login = (data) => {
  axios({
    method: 'post',
    url: '/login',
    params: {
      username: data.userName,
      password: data.passWord
    },
    headers: {
      Authorization: this.$store.user.getToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    if (res.code === 200) {
      // 获取角色代表id，存储在数组中
      const logonUserRole = []
      res.data.forEach(role => {
        logonUserRole.push(role.id)
      })
      // 将角色信息存在localStorage中
      storage.set('logonUserRole', logonUserRole)// 后续应将其替换，存在在vuex中的权限模块中
      this.$Message.success({
        content: '登录成功',
        duration: 0.2
      })
    }
    console.log('222')
  }).catch(err => {
    console.log(err)
    console.log('333')
  })
}
