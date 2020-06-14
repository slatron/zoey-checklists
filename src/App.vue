<template>
  <div
    id="app"
    v-if="ready"
    class="layout-wrap"
    :class="{'drawer-open': drawer_open}"
  >
    <NavDrawer></NavDrawer>
    <div
      v-if="shade"
      class="window-shade"
      @click="toggleShade()"
    />
    <SiteHeader></SiteHeader>
    <LoginForm></LoginForm>
    <ErrorMessage></ErrorMessage>
    <main class="default-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { Auth } from './db';
import LoginForm from '@/components/layout/LoginForm'
import ErrorMessage from '@/components/layout/ErrorMessage'
import SiteHeader from '@/components/layout/SiteHeader'
import NavDrawer from '@/components/layout/NavDrawer'

export default {
  name: 'AppLayout',
  components: {
    NavDrawer,
    LoginForm,
    ErrorMessage,
    SiteHeader
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    drawer_open () {
      return this.$store.state.layout.drawer_open
    },
    shade () {
      return this.$store.state.layout.shade_on
    }
  },
  created: function() {
    const AppLayout = this
    Auth.onAuthStateChanged(function(user) {
      const logged_in = user ? true : false
      AppLayout.$store.commit('SET_LOGIN_STATUS', {'status': logged_in})
    });
    // Init Cascade
    // TODO: Handle these better w/ async functions
    AppLayout.$store.dispatch('INIT_CHORE_PEOPLE')
      .then(() => {
        AppLayout.$store.dispatch('INIT_ITEMS')
          .then(() => {
            // TODO: ALL BUSINESS LOGIC TO SETUP LISTS IS IN 'INIT_LIST_CACHE'
            //       - REFACTOR TO SEPARATE MODULE
            AppLayout.$store.dispatch('INIT_LIST_CACHE')
              .then(() => AppLayout.ready = true)
          })
      })
  },
  methods: {
    toggleDrawer: function () {
      this.$store.commit('TOGGLE_DRAWER')
    },
    toggleShade: function () {
      this.$store.commit('TOGGLE_SHADE')
    }
  },
  watch: {
    // Close Drawer on route changes
    '$route' (to, from) {
      this.$store.commit('TOGGLE_DRAWER', { 'force': false })
    }
  },
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
@import './assets/css/settings.scss';
@import './assets/css/reset.scss';
@import './assets/css/base.scss';
@import './assets/css/layout.scss';
@import './assets/css/mods/checklist-item.scss';
@import './assets/css/mods/nav-drawer.scss';
@import './assets/css/state.scss';
</style>
