<template>
    <div >
        <div class="header" @click="getBusinessQy">
            <Menu @click="getBusinessQy"></Menu>
        <!--<el-row type="flex" class="row-bg" justify="space-between">-->
            <!--<el-col :span="6">-->
                <!--<div class="grid-content icon-collapase">-->
                <!--<i class="el-icon-s-flag" @click="changeMenuStatus"></i>-->
            <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="6"><div class="grid-content title">欢迎你：{{nickname}}</div></el-col>-->
            <!--<el-col :span="6"><div class="grid-content userinfo" @click="rev">-->
               <!--登出</div></el-col>-->


        </div>
    </div>
</template>

<script>
    import bus from "./bus"
    import Menu from '../Home/Menu'
    import {mapMutations,mapActions} from "vuex"
    export default {
      name:'tou',
      components:{
        Menu
      },
      data(){
        return {
          nickname:'',

        }
      },
      mounted(){
        this.nickname=localStorage.getItem('nickname')
      },
       methods:{
         ...mapActions(['getBusinessQy']),

           rev(){
               localStorage.clear();
               this.$router.push("/login");
               this.$message({
                   message:'登出成功',
                   type:'success'
               });
           }
       }
    }

</script>
<style>
    .icon-collapase{
    text-align: left;
    font-size: 30px;
    cursor: pointer;
    color: red;
}


    .row-bg,.el-header {
        background-color:#1e9fff;
        color: white;
        opacity: .8;
        font-size: 18px;
    }
 .grid-content.title{
     width: 200px;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
 }

</style>