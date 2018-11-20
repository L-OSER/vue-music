import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
// 通过mutations修改state会从控制台输出日志,方便查看

Vue.use(Vuex)

// 检查开发模式,不建议线上用,耗性能
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [] // 通过mutation修改state的时候会在控制台打印logge
})
