<template>
  <div id="app">
    Option
    <li v-for="i in arr">{{ i | fff }}</li>
  </div>
</template>

<script>
  export default {
    name: 'firendList',
    data () {
      return {
        arr: [1, 2, 3]
      }
    },
    filters: {
      fff (item, val) {
        console.log(item)
        if (item > 1) {
          return item
        }
        return null
      }
    }
  }
</script>

<style scoped>

</style>
