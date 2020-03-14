<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      };
    },

    beforeDestroy () {

    },
    methods: {

    },
    mounted(){
      // 刷新页面清除缓存
      // window.onbeforeunload = function (e) {
      //   var storage = window.localStorage;
      //   storage.clear()
      // }
    }


  };
</script>


