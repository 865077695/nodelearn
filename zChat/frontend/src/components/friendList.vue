<template>
  <div id="friend-list">
    <ul class="list">
      <li class="friend">
        <router-link to="/Public" tag="div">公共聊天室<span style="float: right;margin-right:10px;"> > </span></router-link>
      </li>
      <li class="friend" v-for="friend in FriendList">
        <router-link :to="{name: 'Private', params: {socketId: friend.id,user: friend.user}}" tag="div">
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
        var that = this
        this.live_list.forEach(function (item) {
          item.imgSrc = './static/img/userPhoto/zhiq.png'
          // 如果item不是本人，将item推入数组list
          if (item.user !== that.$store.state.user) {
            list.push(item)
          }
        })
        return list
      }
    },
    beforeCreate () {
      var that = this
      that.$socket.emit('connection', '连接成功')
      if (this.$store.state.user === '') {
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
    /*overflow: auto;*/
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
