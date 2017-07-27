/**
 * Created by zzq on 2017/7/27.
 */
import Vue from 'vue'
Vue.filter('fff', function (value) {
  console.log(value)
  return value > 2
})
