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
      path: '/select-chorelist',
      name: 'select-chorelist',
      component: SelectPersonView
    },
    {
      path: '/chores',
      name: 'chores',
      component: () => import(/* webpackChunkName: "chores" */ './views/ChoredayAddView.vue')
    }
  ]
})
