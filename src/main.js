import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FastClick from 'fastclick'
import router from "./router";
import "./assets/styles/global.css";
import  "./assets/styles/el-resets.css";
import VueParticles from 'vue-particles'
import axios from "axios"




Vue.use(VueParticles);   //登录页的粒子效果
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;  //将axios请求继承到vue原型上
FastClick.attach(document.body); //解决移动端点击问题

 router.beforeEach(function (to,from,next) {
   let token=localStorage.getItem("token")||"";
   if (token){
      next()
   }else {
       if (to.path !=="/login"){
           next({path:'/login'})
       }else {
           next()
       }
   }
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
