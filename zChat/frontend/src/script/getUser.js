/**
 * Created by zzq on 2017/7/19.
 * 从后台获取本人用户名
 */
import _ajax from './ajax'
import store from '@/store'

var getUser = function (fn) {
  return _ajax({
    url: 'user/userInfo',
    success: function (res) {
      store.commit('setUser', {user: res.data.user})
      if (typeof fn === 'function') {
        fn(res)
      }
    }
  })
}

export default getUser
