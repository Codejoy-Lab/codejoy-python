import Vue from 'vue'
import Router from 'vue-router'
import Python from '@/pages/Python'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Python',
      component: Python
    }
  ]
})
