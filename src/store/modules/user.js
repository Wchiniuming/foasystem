import storage from '@/utils/storage'

const state = () => ({
  user: {
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
    enabled: true,
    createUser: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    updateUser: {
      type: Number,
      default: 0
    },
    updateTime: '',
    account: '',
    createTime: '',
    lastLoginTime: '',
    userName: '',
    password: ''
  }
})

const getters = {
  getUserId (state) {
    return state.id
  },
  // 获取本地最新token
  getToken (state) {
    if (!state.token) {
      state.token = storage.get('token')
    }
    return state.token
  }
}

const mutations = {
  initUserData (state, userData) {
    state.user = userData
  },
  updateLoginTime (state, newTime) {
    state.lastLoginTime = newTime
  },
  // 用户登录成功时，存储token信息
  setToken (state, token) {
    state.token = token
    storage.set('token', token)
  },
  // 删除token
  removeToken (state) {
    if (state.token) {
      state.token = null
    }
    storage.remove('token')
  }
}
// const actions = {}

export default {
  namespaced: true,
  getters,
  state,
  mutations
}
