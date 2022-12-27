import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from "@/utils/index.js"
Vue.use(Vuex)
const TOKEN_KEY = 'usertokeninfo'
export default new Vuex.Store({
  state: {
    usertokeninfo: getItem(TOKEN_KEY) || "",//默认为本地存储数据
    VUEPAGE: ['Layout']
  },
  getters: {
  },
  mutations: {
    // TODO:登录成功存储token
    SETUSERTOKENINFOIO(state, value) {
      setItem(TOKEN_KEY, value)
      state.usertokeninfo = value
    },
    //添加页面缓冲
    ADDVUEPAGE(state, pagename) {
      if (!state.VUEPAGE.includes(pagename)) {
        state.VUEPAGE.push(pagename)
      }
    },
    //移除页面缓冲
    REMOVEVUEPAGE(state, pagename) {
      let index = state.VUEPAGE.indexOf(pagename)
      if (index != -1) {
        state.VUEPAGE.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
