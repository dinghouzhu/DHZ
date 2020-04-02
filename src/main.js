import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FastClick from 'fastclick'
import router from "./router";
import "./assets/styles/global.css";
import  "./assets/styles/el-resets.css";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueParticles from 'vue-particles'
import axios from "axios"
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VueParticles);   //登录页的粒子效果
Vue.config.productionTip = false;
Vue.prototype.$http = axios;  //将axios请求继承到vue原型上
FastClick.attach(document.body); //解决移动端点击问题

//重写localstorage的设置方法,增添时间
/*
Storage.prototype.setToken=(key, value, expire) =>{
  let obj={
    data:value,
    time:Date.now(),
    expire:expire
  };
  localStorage.setItem(key,JSON.stringify(obj));//原生方法设置缓存
};
//重写localstorage的获取方法，事实上并不是真正意义上的设置时间，而是在获取的时候判断是否过期(大于设置时的时间,如果大于的话就清除缓存)
Storage.prototype.getToken= key =>{
  let val =localStorage.getItem(key);//原生方法获取缓存
  if(!val){
    return val;
  }
  val =JSON.parse(val);
  if(Date.now()-val.time>val.expire){  //时间戳相减大于设置的时间
    console.log('token已过期');
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
};
*/
//重写时间格式
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
};

 router.beforeEach(function (to,from,next) {
   let token=localStorage.getItem("token")||"";
   if (token){
      next()
   }else {
       if (to.path !=="/login"){
           localStorage.clear();
           next({path:'/login'})//如果没有token或者token过期,清除缓存跳转到登录页
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
