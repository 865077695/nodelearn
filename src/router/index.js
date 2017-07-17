import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sign from '@/components/sign'
import FriendList from '@/components/FriendList'

Vue.use(Router)

const routerList = [
  {path: '/', name: 'Hello', component: Hello},
  {path: '/sign', name: 'Sign', component: Sign},
  {path: '/FriendList', name: 'FriendList', component: FriendList}
]

const router = new Router({
  routes: routerList
})

export default router
