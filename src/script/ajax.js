/**
 * Created by zzq on 2017/7/14.
 * $http({option})
 * option为ajax配置对象。包含url、method、data
 */
import axios from 'axios'
var $http = function (option) {
  var method = option.method || 'GET'
  var data = option.data || ''
  var url = option.url || ''

  return axios({
    url: url,
    method: method,
    data: data,
    baseURL: 'http://localhost:8888/',
    responseType: 'json',
    withCredentials: true
  })
}
export default $http
