import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../components/notFound"
import welcome from "../pages/Home/welcome";
import product  from "../pages/Home/product";
import addPerson from "../pages/Home/addPerson";
import editPerson from "../pages/Home/editPerson";
import Cata from "../pages/Home/Catalog";
import Oneself from "../pages/Home/oneself";
Vue.use(VueRouter);
const routes=[
    {
        path:'/login',
        component: () => import('../components/Login'),
    },
    {
        path:'/',
        component:() => import('../pages/Home/index'),
        redirect:'/welcome',
        children:[
          {
            path:'/welcome',
            component:welcome
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