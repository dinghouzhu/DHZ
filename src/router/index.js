import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../components/Home/notFound"
import product  from "../pages/Home/product";
import addPerson from "../pages/Home/addPerson";
import editPerson from "../pages/Home/editPerson";
import Cata from "../pages/Home/Catalog";
import Oneself from "../pages/Home/oneself";
import Room from "../pages/Home/room"
import Login from "../components/Home/Login"
import Welcome from "../pages/Home/welcome"
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
        path:'/',
        component:() => import('../pages/Home/index'),
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
              keepAlive:true,
              title:'首页'
            }
          },
          {
            name:'product',
            path:'/product',
            component:product,
            meta:{
              keepAlive:true,
              title:'product'
            }
          },
          {
            name:'addPerson',
            path:'/addPerson',
            component:addPerson,
            meta:{
              keepAlive:true,
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
            component:Cata
          },
          {
            name:'oneself',
            path:'/oneself',
            component:Oneself,
            meta:{
              keepAlive:true,
              title:'音乐控件'
            }
          },
          {
            name:'order',
            path:'/order',
            component: () => import('../components/babel/order'),
            meta:{
              keepAlive:true,
              title:'测试'
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
            name:'details',
            path:'/details',
            component: () => import('../components/babel/details'),
            meta:{
              keepAlive:true,
              title:'疫情防控'
            }

          },


        ]


    },
  {
    path: "/404",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }

];
export default new VueRouter(
    {
        routes,
        mode:'history'
    }
)