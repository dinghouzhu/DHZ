<template>
    <div>
        <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
                <div class="grid-content icon-collapase">
                <i class="el-icon-s-flag" @click="changeMenuStatus"></i>
            </div>
            </el-col>
            <el-col :span="6"><div class="grid-content title">欢迎你：{{nickname}}</div></el-col>
            <el-col :span="6"><div class="grid-content userinfo" @click="rev">
               登出</div></el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    export default {
      data(){
        return {
          nickname:''
        }
      },
      mounted(){
        this.nickname=localStorage.getItem('nickname')
      },
       methods:{
           ...mapMutations(['changeMenuStatus']),
           rev(){
               localStorage.clear()
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
    .userinfo {
        cursor: pointer;
    }
    .row-bg,.el-header {
        background:#545c64;
        color: white;
        opacity: .8;
        font-size: 18px;
    }


</style>