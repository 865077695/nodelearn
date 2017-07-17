<template>
  <div class="FriendList">
    好友列表asdasd
    <ul>
      <li v-for="item in list">
        <img src="" alt="" width="50" height="50" alt="img">
        <div class="item-info">
          <span>item.name</span><br>
          <span>item.msg</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'FriendList',
    data () {
      return {
        list: [
          {name: 'zhiq', msg: 'hi'},
          {name: 'zhiq', msg: 'hi'},
          {name: 'zhiq', msg: 'hi'}
        ]
      }
    }
  }
</script>

<style scoped>
  ul{
    list-style: none;padding:5px;overflow: hidden;
  }
  li{overflow: hidden;margin-bottom: 3px;background: #efefef;padding:5px}
  img,.item-info{float:left;}
  .item-info{padding-left: 10px;line-height: 25px;}
</style>
