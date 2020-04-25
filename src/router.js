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
      name: 'read-homeschool',
      component: () => import(/* webpackChunkName: "read-homeschool" */ './views/HomeschoolReadView.vue')
    },
    {
      path: '/chores',
      name: 'chores',
      component: () => import(/* webpackChunkName: "chores" */ './views/ChoredayAddView.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import(/* webpackChunkName: "rules" */ './views/Rules.vue')
    }
  ]
})
