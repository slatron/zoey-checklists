<template>
  <div class="select-person-area content-spacer checklist-items">
    <h2>Who Are You?</h2>
    <label
      v-for="chore_person in chore_people"
      :key="chore_person.key"
      @click="setPerson(chore_person)"
      :class="{'finished': chore_person.finished}"
      class="centered-vert">
      <div class="checklist-text">{{chore_person.name}}</div>
      <font-awesome-icon v-show="chore_person.finished" icon="chess-queen" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectPerson',
  computed: {
    chore_people () {
      const chore_people = this.$store.state.chores.chore_people
      const list_cache   = this.$store.state.chores.list_cache
      chore_people.forEach(person => {
        if (list_cache[person.key]) {
          person.finished = list_cache[person.key].approved
        }
      })
      return chore_people
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
  .checklist-text { margin-right: 1em; }
</style>
