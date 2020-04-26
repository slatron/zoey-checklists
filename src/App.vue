<template>
  <div
    id="app"
    v-if="ready"
    class="layout-wrap"
    :class="{'drawer-open': drawer_open}"
  >
    <nav id="drawer">
      <ul>
        <li>
          <router-link to="/chores">
            Chore List
          </router-link>
        </li>
        <li>
          <router-link to="/">
            Home School
          </router-link>
        </li>
      </ul>
    </nav>
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

export default {
  name: 'AppLayout',
  components: {
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
// reset styles
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}
fieldset {
  border: none;
}
a {
  color: #000;
}

// Layout
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}

nav#drawer {
  z-index: 50;
  background: #aaa;
}

.drawer-open > nav#drawer {
  left: 0;
}

.window-shade {
  top: 45px;
  transition-property: left, top;
  transition-duration: .5s, .35s;
  transition-timing-function: ease;
  opacity: 0.75;
  z-index: 20;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  background: #000;
}

#drawer,
.window-shade {
  top: 39px;
  transition-property: left, top;
  transition-duration: .5s, .35s;
  transition-timing-function: ease;
}

#drawer {
  width: 250px;
  left: -250px;
  border-top: 3px solid #000;
  border-right: 3px solid #000;
  border-bottom: 3px solid #000;
  border-radius: 0 1rem 1rem 0;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  max-height: 500px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 5px;
    padding: 10px 0;
  }

  a {
    text-decoration: none;
    font-weight: bold;
  }
}

@media (min-width: 768px) {
  #drawer {
    width: 175px;
    left: -175px;
    max-height: 100px;
  }
}

.layout-wrap {
  height: 100%;
  position: relative;
}

main {
  height: 100%;
  padding-top: 41px;
}

.default-content {
  z-index: 0;
}

// Sitewide Element Classes
.big-label-area {
  margin: 1em;
}

.big-label-area label.big-label {
  font-size: 36px;
  font-weight: bold;
  display: block;
  text-align: left;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  border-right: 4px solid black;
  border-top: 4px solid black;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 15px 25px;
  background-color: aqua;
  svg {
    position: absolute;
    padding-left: 350px;
    transition: all .5s linear;
    opacity: 0;
    color: aqua;
  }
  &.approved {
    background-color: pink;
  }
  &.done {
    background-color: lime;

    svg {
      color: #b71212;
      opacity: 1.0;
      padding-left: 15px;
    }

    .but-save {
      display: block;
    }
  }
  input {
    display: none;
  }
}

// Shared layout classes
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.centered-vert {
  display: flex;
  align-items: center;
}
.block-area {
  padding: 1em;
  margin: 1em;
  display: block;
  width: 100%;
}
.block-area-half {
  padding: 0.5em;
  margin: 0.5em;
  display: block;
  width: 100%;
}
.hand {
  cursor: pointer;
}
</style>
