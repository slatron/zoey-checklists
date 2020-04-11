import Vue from 'vue'
import Router from 'vue-router'
import HomeschoolAddView from './views/HomeschoolAddView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeschool',
      component: HomeschoolAddView
    },
    {
      path: '/homeschool/read',
      name: 'read homeschool',
      component: () => import(/* webpackChunkName: "about" */ './views/HomeschoolReadView.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import(/* webpackChunkName: "about" */ './views/Rules.vue')
    }
  ]
})
