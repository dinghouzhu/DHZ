
<template>
    <div class="Main">
    <div class="Content">
      <el-row class="bgc">
          <el-col :span="24" >
              <!--<template v-for="item in items">-->
              <!--<template v-if="item.list">-->
              <!--<el-submenu-->
              <!--:index="item.code" :key="item.code"-->
              <!--&gt;-->
              <!--<template slot="title">-->
              <!--<span slot="title">{{ item.title }}</span>-->
              <!--</template>-->
              <!--<template v-for="subItem in item.list">-->
              <!--<el-submenu-->
              <!--v-if="subItem.list"-->
              <!--:index="subItem.code"-->
              <!--:key="subItem.code"-->
              <!--&gt;-->
              <!---->
              <!--<template slot="title">{{ subItem.title }}</template>-->
              <!--<el-menu-item-->
              <!--v-for="(threeItem,i) in subItem.list"-->
              <!--:key="i"-->
              <!--:index="(threeItem.list==null)?threeItem.url:threeItem.code"-->
              <!--&gt;-->
              <!---->
              <!--{{ threeItem.title }}</el-menu-item>-->
              <!--</el-submenu>-->
              <!--<el-menu-item-->
              <!--v-else-->
              <!--:index="(subItem.list==null)?subItem.url:subItem.code"-->
              <!--:key="subItem.code"-->
              <!--&gt;-->
              <!---->
              <!--{{ subItem.title }}</el-menu-item>-->
              <!--</template>-->
              <!--</el-submenu>-->
              <!--</template>-->
              <!--</template>&ndash;&gt;-->
              <!--动态渲染菜单-->

              <el-menu
                      background-color="#1e9fff"
                      class="el-menu-demo"
                      mode="horizontal"
                      @select="handleSelect"
                       :router="true"
                       text-color="white"
                      active-text-color="white"

              >
                  <el-menu-item index="/welcome">首页</el-menu-item>
                  <el-submenu index="1" >
                      <template slot="title">
                          <i class="el-icon-menu" style="color: white"></i>
                          <span slot="title">处理中心</span>
                      </template>
                      <el-menu-item index="/room">
                          <i class="el-icon-lollipop" style="color: white"></i>
                          <span slot="title">房间管理</span>
                      </el-menu-item>
                      <el-menu-item index="/editPerson">
                          <i class="el-icon-user" style="color: white"></i>
                          <span slot="title">用户管理</span>
                      </el-menu-item>


                  </el-submenu>
                  <el-menu-item index="/details" >
                      <i class="el-icon-s-opportunity" style="color: white"></i>
                      <span slot="title">疫情防控</span>
                  </el-menu-item>
                  <el-menu-item index="/cata" disabled>
                      <i class="el-icon-lock" style="color: white"></i>
                      <span slot="title">主页测试(未开放)</span>
                  </el-menu-item>
                  <el-menu-item index="/oneself" disabled>
                      <i class="el-icon-service" style="color: white"></i>
                      <span slot="title">音乐页测试(未开放)</span>
                  </el-menu-item>

              </el-menu>
          </el-col>
      </el-row>
    </div>

    <div class="Right">

        <el-menu
                background-color="#1e9fff"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                :router="true"
                text-color="white"
                active-text-color="white"

        >
        <el-submenu index="2" >
            <template slot="title">
                <span slot="title">我是管理员</span>
            </template>
            <el-menu-item index="/addPerson">
                <i class="el-icon-edit" style="color: white"></i>
                <span slot="title">修改密码</span>
            </el-menu-item>
            <el-menu-item @click="rev">
                <i class="el-icon-user" style="color: white"></i>
                <span slot="title">退出</span>
            </el-menu-item>


        </el-submenu>
        </el-menu>
    </div>
    </div>
</template>

<script>

export default {
  data(){
    return{
      img_url:'https://p4.music.126.net/V9tibxqfdJk-BXdyQLn-MQ==/109951163452834453.jpg',
      nickname:'',
    }
  },
  mounted(){
    // this.img_url=localStorage.getItem('img_url')
    this.nickname=localStorage.getItem('nickname')
  },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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

<style >

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }


    .fade-enter-active, .fade-leave-avtive {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
    .el-submenu__title:hover{
        background-color: #42ABF9 !important;
    }
    .el-menu-item:hover{
        background-color: #42ABF9 !important;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .el-menu{
        background-color: #1E9fff;
    }
    .el-menu-item.is-active {
        background: #1e9fff !important;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

.Content{
    width: 80%;
    margin: 0 auto;
}

    .Main{
        width: 100%;
    }
.Right{
    position: absolute;
    right: 0;
    top: 0;
    width: 10%;
    height: 60px;
    background: red;
}



</style>