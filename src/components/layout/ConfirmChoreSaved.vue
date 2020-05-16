  <template lang="html">
  <div class="shade-form" v-if="open_confirm_chore_saved" @click="closeForm()">
    <form @submit.prevent>
      <div class="button-row-submit color-blue">
        <font-awesome-icon icon="poo" />
        <p>Approved!</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ConfirmNotAllFinished',
  computed: {
    open_confirm_chore_saved () {
      return this.$store.state.layout.open_confirm_chore_saved
    }
  },
  methods: {
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
