<template>
    <div class="home">
        <el-container>
<!--            菜单-->
        <el-aside width="">
      <Menu></Menu>

        </el-aside>
        <el-container>

            <el-header>
<!--               顶栏 -->
         <Header></Header>

            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container></div>
</template>

<script>
    import Menu from "../../components/Home/Menu"
    import Header from "../../components/Home/Header";
    export default {
       components:{
           Menu,
           Header
       }
    }
</script>

<style>

</style>
