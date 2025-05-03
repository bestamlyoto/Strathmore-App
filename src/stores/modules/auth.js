// src/store/modules/auth.js
const state = () => ({
  user: JSON.parse(localStorage.getItem('user')) || null
})

const mutations = {
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }
}

const actions = {
  login({ commit }, userData) {
    commit('SET_USER', userData)
  },
  logout({ commit }) {
    commit('SET_USER', null)
  }
}

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
