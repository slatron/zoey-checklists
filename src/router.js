import Vue from 'vue'
import Router from 'vue-router'
import Homeschool from './views/Homeschool.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeschool',
      component: Homeschool
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import(/* webpackChunkName: "about" */ './views/Rules.vue')
    }
  ]
})
