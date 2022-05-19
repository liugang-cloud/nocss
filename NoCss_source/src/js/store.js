import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export let store = new Vuex.Store({
    state: {
        dom_list: [{
            tag: 'div',
            order: '1',
            sub: [],
            stylelist: ["block", "inline"]
        }],
        active_node: '',
        active_stylelist: []
    },
    getters: {
        stylelist() {
            return state.active_stylelist
        }
    }

})