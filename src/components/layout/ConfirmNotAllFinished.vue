  <template lang="html">
  <div class="shade-form" v-if="open_confirm_not_all_finished">
    <form @submit.prevent>
      <div class="button-row-submit">
        <font-awesome-icon class="color-blue" icon="poo" />
        <p>Are you sure? {{ unfinished_count }} tasks are not completed.</p>
        <button
          class="action"
          @click="saveChoreday()"
        >
          YES, APPROVE
        </button>
        <button
          class="action"
          @click="closeForm()"
        >
          NO, GO BACK
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ConfirmNotAllFinished',
  computed: {
    open_confirm_not_all_finished () {
      return this.$store.state.layout.open_confirm_not_all_finished
    },
    unfinished_count () {
      const chores = this.$store.state.chores.form_data
      const person_key = this.$store.state.chores.current_person.key
      const items = this.$store.state.chores.list_items[person_key]
      const chore_status = items.map(label => {
        return chores[label.key]
      })
      const unfinished_chores = chore_status.filter(chore => {
        return !chore
      })
      return unfinished_chores.length
    }
  },
  methods: {
    saveChoreday: function() {
      this.$store.dispatch('SAVE_CHOREDAY')
      // this.$store.commit('TOGGLE_SHADE', {force: false})
      this.$store.commit('CONFIRM_CHORE_SAVED')
    },
    closeForm: function() {
      this.$store.commit('TOGGLE_SHADE', {force: false})
    }
  }
}
</script>

<style lang="css" scoped>
.shade-form {
  text-align: center;
}
button {
  font-size: 14px;
  font-weight: bold;
  margin-right: 1em;
  padding: 1em;
}
svg {
  font-size: 160px;
  margin-bottom: 30px;
}
p {
  margin-bottom: 30px;
  font-family: 'Bree Serif', serif;
}
</style>
