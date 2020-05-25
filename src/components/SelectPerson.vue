<template>
  <div class="select-person-area content-spacer checklist-items">
    <h2>Who Are You?</h2>
    <label
      v-for="chore_person in chore_people"
      :key="chore_person.key"
      @click="setPerson(chore_person)"
      :class="{'finished': list_cache[chore_person.key].approved}"
      class="centered-vert">
      <div class="checklist-text">{{chore_person.name}}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectPerson',
  computed: {
    chore_people () {
      return this.$store.state.chores.chore_people
    },
    list_cache () {
      return this.$store.state.chores.list_cache
    }
  },
  methods: {
    setPerson: function(chore_person) {
      this.$store.commit('SELECT_CHORE_PERSON', chore_person)
      this.$router.push('chores')
    }
  }
}
</script>

<style scoped lang="scss">
  h2 { margin-bottom: 1em; }
  .finished {background: #c1f3b2}
</style>
