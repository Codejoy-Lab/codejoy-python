import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // element-ui的全部组件
// import 'element-ui/lib/theme-chalk/index.css'// element-ui的css
import '../src/assets/style/element-#1EAFF7/index.css'
import axios from 'axios'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)
Vue.use(ElementUI) // 使用elementUI

Vue.prototype.$axios = axios
Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
