<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      首页
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Hello',
    data () {
      return {
        msg: '首页'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
