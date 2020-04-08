<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.big-label-area label {
  font-size: 48px;
  font-weight: bold;
  display: block;
  height: 100px;
  text-align: left;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  border-right: 4px solid black;
  border-top: 4px solid black;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  background-color: aqua;

  svg {
    padding-left: 15px;
    display: none;
    color: #b71212;
  }

  &.approved {
    background-color: pink;
  }

  &.done {
    background-color: lime;

    svg {
      display: block;
    }

    .but-save {
      display: block;
    }
  }

  input {
    display: none;
  }
}


// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
