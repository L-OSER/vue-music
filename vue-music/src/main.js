import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'

Vue.config.productionTip = false

import 'common/stylus/index.styl'
/* 解决移动端点击三百毫秒的延迟 */
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
