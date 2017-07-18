<template>
  <div class="hello">
    <group>
      <x-textarea v-model="speak" :rows="1" :show-counter="false" :max="50" autosize></x-textarea>
    </group>
  </div>
</template>

<script>
  import {Group, XTextarea} from 'vux'
  export default {
    name: 'Chat',
    components: {Group, XTextarea},
    data () {
      return {
        speak: '底部聊天窗口的组件，供私聊和公共聊天室两个路由使用,包含一个input和添加图片、拍照、表情等功能'
      }
    },
    sockets: {
      connection: function (val) {
        console.log('connection ok')
      }
    },
    mounted () {
      this.$socket.emit('connection')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
