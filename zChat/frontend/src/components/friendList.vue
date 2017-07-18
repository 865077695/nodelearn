<template>
  <div id="friend-list">
    <ul class="list">
      <li class="friend" v-for="friend in FriendList">
        <router-link :to="'/Private/'+friend.name" tag="div">
          <img class="friend-photo" :src="friend.imgSrc" alt="" width="50" height="50">
          <span class="friend-name">{{ friend.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'firendList',
    store,
    data () {
      return {
        FriendList: [
          {'name': 'zhiq', 'imgSrc': 'static/img/userPhoto/zhiq.png'},
          {'name': '志强', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq2', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'},
          {'name': 'zhiq3', 'imgSrc': './static/img/userPhoto/zhiq.png'}
        ],
        user: ''
      }
    },
    sockets: {
      connection: function () {
        console.log('socket connect')
      }
    }
  }
</script>

<style scoped>
  #friend-list {
    position: absolute;
    top: 46px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: auto;
  }

  #friend-list::-webkit-scrollbar-thumb {
    background: #ccc;
    width: 3px;
    border-radius: 10px;
  }

  #friend-list::-webkit-scrollbar-track {
    background: #f7f7f7;
    width: 3px;
  }

  #friend-list::-webkit-scrollbar {
    width: 5px
  }

  .friend {
    margin-top: 5px;
    padding: 5px;
    background: #f7f7fa
  }

  .friend-photo {
    border-radius: 5px;
    vertical-align: middle;
  }

  .friend-name {
    vertical-align: middle;
    padding-left: 10px;
    color: #5e7a88
  }
</style>
