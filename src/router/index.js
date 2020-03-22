import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../components/Home/notFound"
import product  from "../pages/Home/product";
import addPerson from "../pages/Home/addPerson";
import editPerson from "../pages/Home/editPerson";
import Cata from "../pages/Home/Catalog";
import Oneself from "../pages/Home/oneself";
import Room from "../pages/Home/room"
Vue.use(VueRouter);
const routes=[
    {
        name:'login',
        path:'/login',
        component: () => import('../components/Home/Login'),
    },

    {
        path:'/',
        component:() => import('../pages/Home/index'),
        redirect:'/welcome',
        children:[
          {
            name:'welcome',
            path:'/welcome',
            component:() => import('../pages/Home/welcome'),
          },
          {
            name:'product',
            path:'/product',
            component:product
          },
          {
            name:'addPerson',
            path:'/addPerson',
            component:addPerson
          },
          {
            name:'editPerson',
            path:'/editPerson',
            component:editPerson
          },
          {
            name:'cata',
            path:'/cata',
            component:Cata
          },
          {
            name:'oneself',
            path:'/oneself',
            component:Oneself
          },
          {
            name:'room',
            path:'/room',
            component:Room
          },
          {
            name:'details',
            path:'/welcome/details',
            component: () => import('../components/babel/details'),
          },
          {
            name:'order',
            path:'/welcome/order',
            component: () => import('../components/babel/order'),
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