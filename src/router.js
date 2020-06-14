import Vue from 'vue'
import Router from 'vue-router'
import SelectUserView from './views/SelectUserView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default-page',
      component: SelectUserView
    },
    {
      path: '/select-chorelist',
      name: 'select-chorelist',
      component: SelectUserView
    },
    {
      path: '/chores',
      name: 'chores',
      component: () => import(/* webpackChunkName: "chores" */ './views/ChoredayAddView.vue')
    }
  ]
})
