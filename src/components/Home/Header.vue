<template>
    <div >
        <div class="header">
            <Menu></Menu>
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
    import Menu from '../Home/Menu'
    import {mapMutations} from "vuex"
    export default {
      components:{
        Menu
      },
      data(){
        return {
          nickname:''
        }
      },
      mounted(){
        this.nickname=localStorage.getItem('nickname')
      },
       methods:{
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
    .el-submenu__title:hover{
        background-color: #42ABF9 !important;
    }
    .el-menu-item:hover{
        background-color: #42ABF9 !important;
    }
    .userinfo {
        cursor: pointer;
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