<template>
  <div id="app">
    <x-header :left-options="leftOptions">{{ title }}</x-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Alert, XHeader} from 'vux'
  import store from './store/index'
  export default {
    name: 'app',
    store,
    components: {Alert, XHeader},
    data () {
      return {
        leftOptions: {showBack: false}
      }
    },
    computed: {
      title () {
        return this.$store.state.title
      }
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

  *::-webkit-scrollbar-thumb {
    background: #ccc;
    width: 3px;
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: #f7f7f7;
    width: 3px;
  }

  *::-webkit-scrollbar {
    width: 5px
  }
</style>
