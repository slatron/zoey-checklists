<template>
  <div
    id="app"
    v-if="ready"
    class="layout-wrap"
    :class="{'drawer-open': drawer_open}"
  >
    <NavDrawer></NavDrawer>
    <div
      v-if="drawer_open"
      class="window-shade z-40 md:hidden"
      @click="toggleDrawer()"
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
    }
  },
  created: function() {
    const AppLayout = this
    Auth.onAuthStateChanged(function(user) {
      const logged_in = user ? true : false
      AppLayout.$store.commit('SET_LOGIN_STATUS', {'status': logged_in})
    });
  },
  mounted: function() {
    this.ready = true
  },
  methods: {
    toggleDrawer: function () {
      this.$store.commit('TOGGLE_DRAWER')
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
@import './assets/css/reset.scss';
@import './assets/css/layout.scss';
@import './assets/css/mods/checklist-item.scss';
@import './assets/css/state.scss';
</style>
