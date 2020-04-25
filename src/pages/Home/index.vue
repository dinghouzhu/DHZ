<template>

        <el-container>
            <el-header>
         <Header></Header>
            </el-header>
            <el-footer>
            <Tag></Tag>
            </el-footer>
            <el-footer >
                <Music ></Music>
            </el-footer>
            <el-main>
                <keep-alive :include="$store.state.include">
                <router-view></router-view>
                </keep-alive>
            </el-main>



    </el-container>

</template>

<script>
    import Header from "../../components/Home/Header";
    import Music from "./oneself";
    import Tag from "../../components/Home/Tags"


    export default {
      name:'index',
       components:{
         Tag,
           Header,
         Music
       },

    }
</script>

<style>
    .el-header{
        width: 100%;
        background-color:#026bf4;
    }
.el-footer{
    width: 100%;
    background: #e9eef3;
    height: 50px !important;
}

</style>
