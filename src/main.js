import Vue from 'vue'
import './plugins/fontawesome'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'

// Font Awesome cli setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { faFlask } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faRunning } from '@fortawesome/free-solid-svg-icons'
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
import { faHandRock } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons'
import { faPumpSoap } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faTooth } from '@fortawesome/free-solid-svg-icons'
import { faFaucet } from '@fortawesome/free-solid-svg-icons'
import { faSoap } from '@fortawesome/free-solid-svg-icons'
import { faHeadSideMask } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPrescriptionBottle)
library.add(faWalking)
library.add(faFaucet)
library.add(faHeadSideMask)
library.add(faTooth)
library.add(faHandRock)
library.add(faBars)
library.add(faBook)
library.add(faCalculator)
library.add(faFlask)
library.add(faRunning)
library.add(faSoap)
library.add(faMusic)
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
