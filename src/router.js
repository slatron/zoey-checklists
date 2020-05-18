import Vue from 'vue'
import Router from 'vue-router'
import SelectPersonView from './views/SelectPersonView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default-page',
      component: SelectPersonView
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
      path: '/bonus',
      name: 'bonus',
      component: () => import(/* webpackChunkName: "bonus" */ './views/BonusAddView.vue')
    },
    {
      path: '/homeschool',
      name: 'homeschool',
      component: () => import(/* webpackChunkName: "bonus" */ './views/HomeschoolAddView.vue')
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import(/* webpackChunkName: "rules" */ './views/Rules.vue')
    }
  ]
})
