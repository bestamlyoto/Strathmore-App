// src/store/index.js
import { createStore } from 'vuex'
import auth from './modules/auth'  // 👈 we import the auth module

const store = createStore({
  modules: {
    auth    // 👈 register the auth module
  }
})

export default store
