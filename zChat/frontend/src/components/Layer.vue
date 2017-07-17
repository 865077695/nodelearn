<template>
  <div class="section">
    <router-view></router-view>
    <!--底部菜单选项-->
    <div class="bottom-nav">
      <tabbar>
        <tabbar-item selected link="/" :icon-class="'iconfont icon-shouye'" badge="11">
          <i slot="icon"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item show-dot link="/FriendList" :icon-class="'iconfont icon-dingdanliebiaozaixiangoutong'">
          <i slot="icon"></i>
          <span slot="label">在线列表</span>
        </tabbar-item>
        <tabbar-item show-dot link="/Option" :icon-class="'iconfont icon-icon10'" show-dot>
          <i slot="icon"></i>
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index.js'
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    name: 'section',
    data () {
      return {
        msg: '首页'
      }
    },
    components: {Tabbar, TabbarItem, router}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
