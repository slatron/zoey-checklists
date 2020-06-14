<template>
  <div class="select-user-area content-spacer checklist-items">
    <h2>Who Are You?</h2>
    <label
      v-for="chore_user in chore_users"
      :key="chore_user.key"
      @click="setUser(chore_user)"
      :class="{'finished': chore_user.finished}"
      class="centered-vert">
      <div class="checklist-text">{{chore_user.name}}</div>
      <font-awesome-icon v-show="chore_user.finished" icon="chess-queen" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectUser',
  computed: {
    chore_users () {
      const chore_users = this.$store.state.chores.chore_people
      const list_cache   = this.$store.state.chores.list_cache
      chore_users.forEach(user => {
        if (list_cache[user.key]) {
          user.finished = list_cache[user.key].approved
        }
      })
      return chore_users
    }
  },
  methods: {
    setUser: function(chore_user) {
      this.$store.commit('SELECT_CHORE_USER', chore_user)
      this.$router.push('chores')
    }
  }
}
</script>

<style scoped lang="scss">
  h2 { margin-bottom: 1em; }
  .finished {background: #c1f3b2}
  .checklist-text { margin-right: 1em; }
</style>
