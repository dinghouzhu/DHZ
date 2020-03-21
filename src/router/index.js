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
        path:'/login',
        component: () => import('../components/Home/Login'),
    },
  {
    path:'/details',
    component: () => import('../components/babel/details'),
  },
    {
        path:'/',
        component:() => import('../pages/Home/index'),
        redirect:'/welcome',
        children:[
          {
            path:'/welcome',
            component:() => import('../pages/Home/welcome'),
          },
          {
            path:'/product',
            component:product
          },
          {
            path:'/addPerson',
            component:addPerson
          },
          {
            path:'/editPerson',
            component:editPerson
          },
          {
            path:'/cata',
            component:Cata
          },
          {
            path:'/oneself',
            component:Oneself
          },
          {
            path:'/room',
            component:Room
          },
          {
            path:'/welcome/details',
            component: () => import('../components/babel/details'),
          },
          {
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