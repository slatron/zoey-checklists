import Vue from 'vue'
import Vuex from 'vuex'

import authStateModule from '@/state_modules/authState'
import layoutStateModule from '@/state_modules/layoutState'
import choreStateModule from '@/state_modules/choreState'

Vue.use(Vuex)

function builder (data) {
  return new Vuex.Store({
    modules: {
      auth: authStateModule,
      layout: layoutStateModule,
      chores: choreStateModule
    }
  })
}

export default builder
