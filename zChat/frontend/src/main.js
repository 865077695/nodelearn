// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:8888')

import _ajax from './script/ajax.js'
Vue.prototype._ajax = _ajax

import {AlertPlugin} from 'vux'
Vue.use(AlertPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
