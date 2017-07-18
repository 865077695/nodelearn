<template>
  <div class="hello">
    Private
    <div class="speak">
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
  import Chat from '@/components/Chat/Chat.vue'

  export default {
    name: 'Private',
    components: {
      Chat
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
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
