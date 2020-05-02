<template>
  <div class="choreday-area checklist-item">
    <ChecklistItem
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></ChecklistItem>
    <label
      v-if="user_logged_in"
      :class="{'done': form_data.approved}"
      class="approved big-label"
      for="cb-approved">
      Approved
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-approved" id="cb-approved" v-model="form_data.approved">
    </label>
    <textarea v-model="form_data.comments" placeholder="Comment"></textarea>
    <button
      v-if="!finished && user_logged_in && form_data.approved"
      @click="saveDay()"
      class="but-save">
      SAVE
    </button>
  </div>
</template>

<script>
import ChecklistItem from '@/components/ChecklistItem'

export default {
  name: 'ChoredayAdd',
  components: {
    ChecklistItem
  },
  created: function() {
    this.$store.dispatch('GET_LABELS', {})
  },
  computed: {
    labels () {
      return this.$store.state.chores.labels
    },
    form_data () {
      return this.$store.state.chores.form_data
    },
    user_logged_in () {
      return this.$store.state.auth.user_logged_in
    },
    finished () {
      return this.$store.state.chores.day_finished
    }
  },
  methods: {
    saveDay: function() {
      let post_data = this.form_data
      post_data.approved = true
      this.$store.dispatch('SAVE_CHOREDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  min-height: 100px;
  font-size: 36px;
}

label {
  font-weight: bold;
}
</style>
