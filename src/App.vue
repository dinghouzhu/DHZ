<template>
  <div id="app">
<keep-alive :include="include">
      <router-view ></router-view>
</keep-alive>

  </div>
</template>

<script>
    import {getAgain} from "./api";
  export default {
    data () {
      return {
        include:['welcome','room']
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
      //周期性请求token是否过期
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


