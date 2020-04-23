<template>
  <div id="app">
          <router-view ></router-view>
  </div>
</template>

<script>
    import {getAgain,getJur} from "./api";
  export default {
    data () {
      return {
        nowTime:null,
        turn:null,
      };
    },

    beforeDestroy () {

    },
    methods: {
     getJur(){
       getJur()
         .then(res=>{
           this.turn=res.data.data.res[0].value;
           console.log(this.turn);
           if (this.turn == 0) {
             this.$store.state.turn=this.turn;
             localStorage.clear();
             this.$message({
               type:'error',
               message:'禁止登录,请与管理员联系！'
             });
             this.$router.push('/');
           }
         })
         .catch(err=>{
           console.log(err);
         })
     }
  },

    mounted(){
        this.getJur();
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
          this.getJur();
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
        },30000)
      }

    }


  };
</script>
<style>

    /*html{*/
        /*filter: grayscale(100%);*/
        /*-webkit-filter: grayscale(100%);*/
        /*-moz-filter: grayscale(100%);*/
        /*-ms-filter: grayscale(100%);*/
        /*-o-filter: grayscale(100%);*/
        /*filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);*/
    /*}*/
</style>

