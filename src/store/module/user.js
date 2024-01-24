import CryptoJS from 'crypto-js'
import { getToken, removeRefreshToken, removeToken, setToken } from '@/utils/token'
import { loginByPhone, logout } from '@/api/login'

const user = {
  state: {
    token: getToken()
  },

  actions: {
    LoginByPhone({ commit }, { phone, password }) {
      return new Promise((resolve, reject) => {
        loginByPhone({ phone, password: CryptoJS.MD5(password).toString() })
          .then(res => {
            const { code, data, message } = res
            if (code !== 200) throw new Error(message)
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    FedLogout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            removeToken()
            removeRefreshToken()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    }
  }
}

export default user
