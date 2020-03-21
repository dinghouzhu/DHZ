<template>
  <div class="menu">
      <el-row >
          <el-col :span="24" class="bgc">
            <div class="gg" :span="3" :style="{backgroundImage: 'url(' + (img_url) + ')'}"></div>

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
                      default-active="2"
                      :collapse="$store.state.menu_collapse"
                      class="el-menu-vertical-demo"
                      :router="true"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#ffd04b">
                  <el-menu-item index="/welcome">
                      <i class="el-icon-menu"></i>
                      <span slot="title">首页</span>
                  </el-menu-item>
                  <el-submenu index="1">
                      <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>管理中心</span>
                      </template>
                      <el-menu-item index="/product">
                          <i class="el-icon-s-order"></i>
                          <span slot="title">操作数据</span>
                      </el-menu-item>
                      <el-menu-item index="/room">
                          <i class="el-icon-lollipop"></i>
                          <span slot="title">房间管理</span>
                      </el-menu-item>
                      <el-menu-item index="/editPerson">
                          <i class="el-icon-user"></i>
                          <span slot="title">用户管理</span>
                      </el-menu-item>
                      <el-menu-item index="/addPerson">
                          <i class="el-icon-edit"></i>
                          <span slot="title">修改密码</span>
                      </el-menu-item>

                  </el-submenu>
                  <el-menu-item index="/cata" disabled>
                      <i class="el-icon-lock"></i>
                      <span slot="title">主页测试(未开放)</span>
                  </el-menu-item>
                  <el-menu-item index="/oneself" >
                      <i class="el-icon-service"></i>
                      <span slot="title">音乐页</span>
                  </el-menu-item>

              </el-menu>
          </el-col>


      </el-row>
  </div>
</template>

<script>

export default {
  data(){
    return{
      img_url:'https://p4.music.126.net/V9tibxqfdJk-BXdyQLn-MQ==/109951163452834453.jpg'
    }
  },
  mounted(){
    // this.img_url=localStorage.getItem('img_url')
  },
    methods:{

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

    .el-aside {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 60px;
        opacity: .9;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .bgc{
        color: white;
        font-size: 20px;
    }
    .gg{
        background-size: 100% 100%;
        height: 150px;
        cursor: pointer;

    }





</style>