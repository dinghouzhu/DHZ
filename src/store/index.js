import Vue from "vue";
import Vuex from "vuex";



Vue.use(Vuex);


export default new Vuex.Store({
  state: {
       menu_collapse:false,
       nickname:localStorage.getItem('nickname')||"",
       content:'',
       token:localStorage.getItem('token')||"",
  },
  mutations: {
      changeMenuStatus(state){
          state.menu_collapse=!state.menu_collapse
      },
      SET_NICKNAME(state,payload){
          state.nickname=payload;
      },
      SET_CONTENT(state,payload){
      state.content=payload;
    },

  },
  actions: {

  },
  getters:{

  },
  modules: {}

});
