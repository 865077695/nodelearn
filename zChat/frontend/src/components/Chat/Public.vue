<template>
  <div class="hello">
    <div class="sysMsg">
      <p>{{ sysMsg }}</p>
    </div>
    <ul id="msg-log">
      <li v-for="msg in msgLog">
        {{msg.user}} say: {{ msg.msg}}
      </li>
    </ul>
    <div class="speak">
      <group>
        <x-textarea v-on:keyup.enter.native="sendMsg" v-model="speak" :rows="1" :show-counter="false" :max="50"
                    autosize></x-textarea>
      </group>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import getUser from '../../script/getUser'
  import {Group, XTextarea} from 'vux'

  export default {
    name: 'Public',
    store,
    components: {
      Group, XTextarea
    },
    data () {
      return {
        speak: 'Welcome to Your Vue.js App',
        welcome: [],
        sysMsg: '',
        newMsg: {},
        msgLog: []
      }
    },
    sockets: {
      // 这里监听服务器触发的事件
      connection: function (val) {
        console.log('connection ok')
      },
      enter (data) {
        this.sysMsg = data.user + '进入了聊天室'
      },
      newMsg (data) {
        console.log(data)
        this.newMsg = data
        this.msgLog.push(this.newMsg)
        if (this.msgLog.length > 15) {
          this.msgLog.shift()
        }
      },
      exit (data) {
        console.log(data)
        this.sysMsg = data.user + '离开了聊天室'
      }
    },
    methods: {
      // 在这里触发服务器socket
      sendMsg () {
        this.$socket.emit('_BROADCAST', {
          msg: this.speak,
          user: this.$store.state.user
        })
        this.speak = ''
      }
    },
    computed: {
//      user () {
//        return this.$store.state.user
//      }
    },
    beforeCreate () {
      var that = this
      that.$socket.emit('connection', '连接成功')
      if (this.$store.state.user === '') {
        getUser(function (res) {
          that.$socket.emit('_ENTER', {user: res.data.user})
        })
      } else {
        that.$socket.emit('_ENTER', {user: that.$store.state.user})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .speak {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
