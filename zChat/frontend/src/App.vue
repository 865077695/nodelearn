<template>
  <div id="app">
    <x-header :left-options="{showBack: true}">{{ title }}</x-header>
    <router-view></router-view>
    <button @click="show">click</button>
  </div>
</template>

<script>
  import {Alert, XHeader} from 'vux'
  import store from './store/index'
  export default {
    name: 'app',
    store,
    components: {Alert, XHeader},
    methods: {
      show: function () {
        this.$vux.alert.show({
          title: 'zhiq',
          content: 'text'
        })
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

</style>
