<template>
  <div id="app" v-if="ready">
    <SiteHeader></SiteHeader>
    <LoginForm></LoginForm>
    <ErrorMessage></ErrorMessage>
    <router-view />
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
  created: function() {
    const AppLayout = this
    Auth.onAuthStateChanged(function(user) {
      const logged_in = user ? true : false
      AppLayout.$store.commit('SET_LOGIN_STATUS', {'status': logged_in})
    });
  },
  data () {
    return {
      ready: false
    }
  },
  mounted: function() {
    this.ready = true
  }
}
</script>


<style lang="scss">
// reset styles
body, html {
  margin: 0;
  padding: 0;
}
fieldset {
  border: none;
}

// Layout
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  padding-top: 31px;
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
  display: flex;
  align-items: center;
  background-color: aqua;
  svg {
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
</style>
