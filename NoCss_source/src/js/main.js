import Vue from 'vue'
//import '../css/index.css'
import '../css/tailwind.css'
import layout from '../component/layout.vue'
import cssom from '../component/cssom.vue'
import dom from '../component/dom.vue'
//import { store } from './store'
import Vuex from 'vuex'
Vue.use(Vuex)


let store = new Vuex.Store({
    state: {
        dom_list: [{
            tag: 'div',
            order: '1',
            stylelist: [],
            content: "",
            sub: [],
            type: 'one',
            background_img: ""
        }],
        active_node: '',
        active_stylelist: [],
        active_content: "",
        active_url: ""
    },
    getters: {
        get_domlist: (state) => {
            return state.dom_list
        },
        get_activestylelist: (state) => {
            return state.active_stylelist
        },
        get_activenode: (state) => {
            return state.active_node
        },
        get_activecontent: (state) => {
            return state.active_content
        },
        get_activeurl: (state) => {
            return state.active_url
        }
    },
    mutations: {
        set_activenode(state, order) {
            state.active_node = order
        },
        set_activestylelist(state, stylelist) {
            state.active_stylelist = stylelist;
        },
        add_style(state, style) {
            state.active_stylelist.push(style)

        },
        set_content(state, content) {
            state.active_content = content
        },
        set_url(state, url) {
            state.active_url = url
        },

    }

})

const app = new Vue({
    el: "#app",

    data: {
        hide: true,
        out: false,
        con: '',
        closeall: true,
    },

    methods: {
        show: function(e) {

            if (e.key == 'R') {
                this.$data.hide = !this.$data.hide;

            }
            if (e.key == ' ') {

                let list = document.querySelectorAll("[url]")

                for (let i = 0; i < list.length; i++) {
                    if (list[i].tagName != "Img") {
                        list[i].removeAttribute("url")
                        list[i].removeAttribute("src")
                    }
                }
                this.con = document.getElementsByClassName("wrap")[0].outerHTML
                let array = this.con.split(">")
                array.pop()

                let temp = []

                //构造字符串数组
                for (let i = 0; i < array.length; i++) {
                    let tag = array[i].slice(array[i].lastIndexOf("<"))
                    let content = array[i].slice(0, array[i].lastIndexOf("<")).trim()
                    if (content.length != 0) {
                        temp.push(content)
                    }
                    temp.push(tag + ">" + "\n")
                }
                temp = temp.slice(1, temp.length - 1)
                    //去掉data属性
                    //let trim = temp[0].slice(temp[0].indexOf("data"), temp[0].indexOf("class"))
                    // temp[0] = temp[0].replace(trim, '')
                for (let i = 0; i < temp.length; i++) {
                    let trim = temp[i].slice(temp[i].indexOf("data"), temp[i].indexOf("order"))
                    temp[i] = temp[i].replace(trim, "")
                    temp[i] = temp[i]
                }

                this.con = temp.join("")
                this.out = !this.out;
                navigator.clipboard.writeText(this.con);
            }
            if (e.key == 'F') {
                let list = document.getElementsByClassName("tab_wrap")
                if (this.closeall == true) {
                    for (let i = 0; i < list.length; i++) {
                        list[i].classList.add("narrow")
                    }
                    this.closeall = false
                } else if (this.closeall == false) {
                    for (let i = 0; i < list.length; i++) {
                        list[i].classList.remove("narrow")
                    }
                    this.closeall = true
                }

            }
        },

        move: function(e) {
            let tree_container = document.getElementsByClassName('tree_container')[0]
            switch (e.key) {
                case "A":
                    tree_container.style.left = (parseInt(tree_container.style.left) + 60) + 'px'
                    break;
                case "D":
                    tree_container.style.left = (parseInt(tree_container.style.left) - 60) + 'px'
                    break;
                case "W":
                    tree_container.style.top = (parseInt(tree_container.style.top) + 60) + 'px'
                    break;
                case "S":
                    tree_container.style.top = (parseInt(tree_container.style.top) - 60) + 'px'
                    break;
            }
        },





    },
    store: store,
    components: {
        dom,
        layout,
        cssom
    },
    created: function() {
        document.addEventListener('keypress', this.show);
        document.addEventListener('keydown', this.move);
    },
})