import Vue from 'vue'
import './plugins/fontawesome'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome cli setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { faPoo } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faGrinBeam } from '@fortawesome/free-solid-svg-icons'

import { faChessQueen } from '@fortawesome/free-solid-svg-icons'

import { faHandsWash } from '@fortawesome/free-solid-svg-icons'
import { faHandLizard } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faShoePrints } from '@fortawesome/free-solid-svg-icons'
import { faCat } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faUtensils)
library.add(faCat)
library.add(faShoePrints)
library.add(faDoorOpen)
library.add(faBed)
library.add(faTrash)
library.add(faChessQueen)
library.add(faHandsWash)
library.add(faHandLizard)
library.add(faSquare)
library.add(faLock)
library.add(faLockOpen)
library.add(faPoo)
library.add(faCheckSquare)
library.add(faCheckCircle)
library.add(faGrinBeam)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(firestorePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
