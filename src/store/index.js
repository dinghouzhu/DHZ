import Vue from "vue";
import Vuex from "vuex";



Vue.use(Vuex);


export default new Vuex.Store({
  state: {
       disabled:true,
       menu_collapse:false,
       nickname:localStorage.getItem('nickname')||"",
       content:'',
       token:localStorage.getItem('token')||"",
  },
  mutations: {
      changeMenuStatus(state){
          state.menu_collapse=!state.menu_collapse;
      },
    changeMenuDisabled(state,payload){
        state.disabled = !state.disabled;
      console.log(state.disabled);
    }


  },
  actions: {

  },
  getters:{

  },
  modules: {}

});
