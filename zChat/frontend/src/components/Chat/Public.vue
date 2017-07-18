<template>
  <div class="hello">
    Public
    <div class="speak">
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
  import Chat from '@/components/Chat/Chat.vue'

  export default {
    name: 'Public',
    components: {
      Chat
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    sockets: {
      connection: function (val) {
        console.log('connection ok')
      }
    },
    mounted () {
      this.$socket.emit('connection', 'asd')
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
