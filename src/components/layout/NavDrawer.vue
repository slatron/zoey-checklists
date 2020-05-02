<template lang="html">
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
      <li>
        <router-link to="/bonus">
          Weekly B-B-B-Bonus
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
nav#drawer {
  z-index: 50;
  background: #aaa;
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
    margin: 0 0 0 15px;
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
  nav#drawer {
    width: 205px;
    left: -205px;
    max-height: 170px;
  }
}
</style>
