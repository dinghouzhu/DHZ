<template>

        <el-container>
            <el-header>
         <Header></Header>
            </el-header>
            <el-footer>
            <Tag></Tag>
            </el-footer>
            <el-footer>
                <Music></Music>
            </el-footer>
            <el-main>
                <router-view></router-view>
            </el-main>



    </el-container>

</template>

<script>
    import Menu from "../../components/Home/Menu";
    import Header from "../../components/Home/Header";
    import Music from "./oneself";
    import Tag from "../../components/Home/Tags"


    export default {
       components:{
         Tag,
           Menu,
           Header,
         Music
       }
    }
</script>

<style>

.el-footer{
    width: 100%;
    background: #e9eef3;
    height: 50px !important;

}

</style>
