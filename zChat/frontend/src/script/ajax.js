/**
 * Created by zzq on 2017/7/14.
 * $http({option})
 * option为ajax配置对象。包含url、method、data
 * fn为登录验证成功的回调函数
 */
import axios from 'axios'
import router from '@/router/index'

var $http = function (option) {
  var method = option.method || 'GET'
  var data = option.data || ''
  var url = option.url || ''
  var fn = option.success
  return axios({
    url: url,
    method: method,
    data: data,
    baseURL: 'http://localhost:8888/',
    responseType: 'json',
    withCredentials: true
  }).then(function (res) {
    if (res.data.code === '4000') {
      router.push('Sign')
    } else {
      fn(res)
    }
  })
}
export default $http
