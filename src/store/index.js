import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUsername (state, payload) {
      state.username = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
