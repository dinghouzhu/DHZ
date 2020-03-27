<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
    import {getAgain} from "./api";
  export default {
    data () {
      return {

      };
    },

    beforeDestroy () {

    },
    methods: {

    },
    beforeCreate(){

      
    },
    mounted(){

      // window.onbeforeunload = function (e) {
      //   var storage = window.localStorage;
      //   storage.clear()
      // }
      if (this.timer){
        clearInterval(this.timer)
      }else {
         this.timer=setInterval(()=>{
          var token=localStorage.getItem('token');
          var _this=this;
          getAgain(token)
            .then(res=>{
              if (res.data.code ==200){
                console.log(res.data.msg);
              }else {
                console.log(res.data.msg);
                localStorage.clear();
                _this.$router.push('/');
                clearInterval(_this.timer)
              }
            })
            .catch(err=>{
              console.log(err);
            })
        },60000)
      }

    }


  };
</script>


