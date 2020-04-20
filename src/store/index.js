import Vue from "vue";
import Vuex from "vuex";



Vue.use(Vuex);


export default new Vuex.Store({
  state: {
       show:false,
       include:['welcome','room','yiqing','order'],//缓存路由
       disabled:true,
       menu_collapse:false,
       nickname:localStorage.getItem('nickname')||"",
       content:'',
       token:localStorage.getItem('token')||"",
  },
  mutations: {
    //同步操作
      changeMenuStatus(state){
          state.menu_collapse=!state.menu_collapse;
      },
    changeMenuDisabled(state,payload){
        state.disabled = !state.disabled;
        console.log(state.disabled);
    },
    SET_BUSINESS_JQYXZ(state,payload){
      state.show=payload;
      console.log(state.show);
    },


  },
  actions: {
    //可以是异步操作
    async getBusinessQyxz({ commit, state }) {
      commit('SET_BUSINESS_JQYXZ', true)
      },
    async getBusinessQy({ commit, state }) {
      commit('SET_BUSINESS_JQYXZ', false)
    }

  },
  getters:{

  },
  modules: {}

});
