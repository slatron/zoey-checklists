<template>
  <div class="select-person-area content-spacer checklist-items">
    <h2>Who Are You?</h2>
    <label
      v-for="chore_person in chore_people"
      :key="chore_person.key"
      @click="setPerson(chore_person.key)"
      class="centered-vert">
      <div class="checklist-text">{{chore_person.name}}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectPerson',

  created () {
    this.$store.dispatch('GET_CHORE_PEOPLE')
  },

  computed: {
    chore_people () {
      return this.$store.state.chores.chore_people
    }
  },
  methods: {
    setPerson: function(key) {
      this.$store.commit('SELECT_CHORE_PERSON', key)
      this.$router.push('chores')
    }
  }
}
</script>

<style scoped lang="scss">
  h2 { margin-bottom: 1em; }
</style>
