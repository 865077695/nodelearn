/**
 * Created by zzq on 2017/7/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOnline: false,
    isLoading: false,
    title: '',
    direction: true,
    user: ''
  },
  mutations: {
    // 这是一个注册的突变方法，通过组件的methods里触发这里的方法来执行相关的state里的数据更新。state里的数据可以由任意组件获取到,参数data为触发时传递的参数。
    routerChangeStart (state, data) {
      state.title = data.title
    },
    setUser (state, data) {
      state.user = data.user
    },
    SOCKET_CONNECT: (state, status) => {
      state.connect = true
    },
    SOCKET_USER_MESSAGE: (state, message) => {
      state.message = message
    }
  }
})
