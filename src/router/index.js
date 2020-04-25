import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../components/Home/notFound"
import addPerson from "../pages/Home/addPerson";
import editPerson from "../pages/Home/editPerson";
import Room from "../pages/Home/room";
import Login from "../components/Home/Login";
import Home from "../pages/Home/index";
import Welcome from "../pages/Home/welcome";
import Order from "../components/babel/order";
import Details from "../components/babel/details";
import Loginlog from "../pages/Home/Loginlog"
Vue.use(VueRouter);
// 重写路由的push方法
//  * 解决，相同路由跳转时，报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};


const routes=[
    {
        name:'login',
        path:'/login',
        component: Login,
      meta:{
        keepAlive:true,
        title:'登陆页'
      }
    },

    {
        name:'welcome',
        path:'/',
        component:Home,
        redirect:'/welcome',
      meta:{
        keepAlive:true,
        title:'welcome'
      },

        children:[
          {
            name:'welcome',
            path:'/welcome',
            component:Welcome,
            meta:{
              keepAlive:false,
              title:'首页'
            }
          },
          {
            name:'Loginlog',
            path:'/loginlog',
            component:Loginlog,
            meta:{
              keepAlive:false,
              title:'登陆日志'
            }
          },
          {
            name:'addPerson',
            path:'/addPerson',
            component:addPerson,
            meta:{
              keepAlive:false,
              title:'修改密码'
            }
          },
          {
            name:'editPerson',
            path:'/editPerson',
            component:editPerson,
            meta:{
              keepAlive:true,
              title:'用户编辑'
            }
          },
          {
            name:'cata',
            path:'/cata',
            component: resolve=>require(['../pages/Home/Catalog'],resolve),
            meta:{
              keepAlive:false,
              title:'测试主页'
            }
          },
          {
            name:'oneself',
            path:'/oneself',
            component: resolve=>require(['../pages/Home/oneself'],resolve),
            meta:{
              keepAlive:false,
              title:'音乐控件'
            }
          },
          {
            name:'order',
            path:'/order',
            component: Order,
            meta:{
              keepAlive:true,
              title:'公告'
            }
          },
          {
            name:'room',
            path:'/room',
            component:Room,
            meta:{
              keepAlive:true,
              title:'房间管理'
            }
          },
          {
            name:'yiqing',
            path:'/details',
            component: Details,
            meta:{
              keepAlive:true,
              title:'疫情防控'
            }
          },
        ]
    },
  {
    name:NotFound,
    path: "/404",
    component: resolve=>require(['../components/Home/notFound'],resolve)
  },
  {
    name:NotFound,
    path: "*",
    redirect: "/404"
  }

];
export default new VueRouter(
    {
        routes,
        // mode:'history'
    }
)