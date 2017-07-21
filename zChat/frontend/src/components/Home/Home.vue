<template>
  <div class="hello">
    home
    <router-link to="/Sign">去登录</router-link>
    <router-link to="/Public">去聊天室</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
