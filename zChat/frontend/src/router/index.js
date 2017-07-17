import Vue from 'vue'
import Router from 'vue-router'
import Layer from '@/components/Layer'
// import section from '@/components/section'
import friendList from '@/components/friendList'
import Option from '@/components/Option'
import Sign from '@/components/Option/Sign'

Vue.use(Router)

// 引入store
import store from '@/store'

const routerList = [
  {
    path: '/',
    name: '首页',
    component: Layer,
    children: [
      {
        path: 'Option',
        name: '个人中心',
        component: Option
      },
      {
        path: 'friendList',
        name: '在线列表',
        component: friendList
      }
    ]
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  }
]

const router = new Router({
  routes: routerList
})

router.beforeEach(function (to, from, next) {
  // 当路由开始之前，触发state的RouterChangeStart，并传入参数title
  store.commit('routerChangeStart', {
    title: to.name
  })
  next()
})

export default router
