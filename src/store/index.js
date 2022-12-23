import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from "@/utils/index.js"
Vue.use(Vuex)
const TOKEN_KEY = 'usertokeninfo'
export default new Vuex.Store({
  state: {
    usertokeninfo: getItem(TOKEN_KEY)//默认为本地存储数据
  },
  getters: {
  },
  mutations: {
    // TODO:登录成功存储token
    SETUSERTOKENINFOIO(state, value) {
      setItem(TOKEN_KEY, value)
      state.usertokeninfo = value
    }
  },
  actions: {
  },
  modules: {
  }
})
