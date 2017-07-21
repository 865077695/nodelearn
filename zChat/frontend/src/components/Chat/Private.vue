<template>
  <div class="hello">
    <ul id="msg-log">
      <li v-for="msg in msgLog">
        <p v-if="msg.speaker==='you'" class="you"><span>{{msg.sender}} : </span> <span>{{msg.msg}}</span></p>
        <p v-if="msg.speaker==='me'" class="me"><span>{{msg.msg}} </span><span>: 我 </span></p>
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
    name: 'Private',
    store,
    components: {
      Group, XTextarea
    },
    data () {
      return {
        speak: 'Welcome to Your Vue.js App',
        msgLog: []
      }
    },
    sockets: {
      PrivateMsg: function (data) {
        // 如果本人是接收者
        if (this.$route.params.user === data.sender) {
          console.log(data.msg)
          this.msgLog.push({msg: data.msg, speaker: 'you', sender: data.sender})
        }
      }
    },
    watch: {
      msgLog: function () {
        this.$nextTick(function () {
          document.getElementById('msg-log').scrollTop = document.getElementById('msg-log').scrollHeight + 100
        })
      }
    },
    methods: {
      // 在这里触发服务器socket
      sendMsg () {
        console.log('sendmsg')
        this.$socket.emit('_BROADCAST_PRIVATE', {
          msg: this.speak,
          sender: this.$store.state.user,
          reciever: this.$route.params.user
        })
        // 将发送的信息直接显示在本人屏幕
        this.msgLog.push({msg: this.speak, speaker: 'me'})
        this.speak = ''
      }
    },
    beforeCreate () {
      this.$store.commit('routerChangeStart', {title: this.$route.params.user})
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
  #msg-log {
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .speak {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  p {
    background: #f7f7fa;
    margin-top: 5px;
    padding: 5px;
    line-height: 24px;
  }

  p.you {
    float: left;
    border-radius: 0 5px 5px 0;
  }

  p.me {
    float: right;
    border-radius: 5px 0 0 5px;
  }

  li {
    margin: 0;
    padding: 0;
    overflow: hidden
  }
</style>
