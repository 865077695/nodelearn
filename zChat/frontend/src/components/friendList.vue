<template>
  <div id="friend-list">
    <ul class="list">
      <li class="friend" v-for="friend in FriendList">
        <router-link :to="'/Private/'+friend.user" tag="div">
          <img class="friend-photo" :src="friend.imgSrc" alt="" width="50" height="50">
          <span class="friend-name">{{ friend.user }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/store'
  import getUser from '../script/getUser'
  export default {
    name: 'firendList',
    store,
    data () {
      return {
        live_list: [],
        user: ''
      }
    },
    sockets: {
      connection: function () {
        console.log('socket connect')
      },
      enter: function (data) {
        console.log(data)
        this.live_list = data.live_list
      },
      exit: function (data) {
        console.log(data)
        this.live_list = data.live_list
      }
    },
    computed: {
      FriendList: function () {
        var list = []
        this.live_list.forEach(function (item) {
          list.push({user: item, imgSrc: './static/img/userPhoto/zhiq.png'})
        })
        return list
      }
    },
    beforeCreate () {
      var that = this
      that.$socket.emit('connection', '连接成功')
      if (this.$store.state.user === '') {
        console.log(222)
        getUser(function (res) {
          console.log(res)
          that.$socket.emit('_ENTER', {user: res.data.user})
        })
      } else {
        that.$socket.emit('_ENTER', {user: that.$store.state.user})
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
