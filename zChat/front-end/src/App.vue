<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from '@/router/index.js'
  export default {
    name: 'app',
    data () {
        return {
            showBack: false
        }
    },
    components: {
      router
    }
  }
</script>

<style lang="less">
  // 引入初始化样式
  @import '~vux/src/styles/reset.less';
  /*引入阿里字体图标*/
  @import '//at.alicdn.com/t/font_2f1mksvy2iou5wmi.css';
  /*引入animate动画库*/
  @import './assets/css/animate.min.css';
</style>
