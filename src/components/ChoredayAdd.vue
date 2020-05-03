<template>
  <div class="choreday-area checklist-items">
    <ChecklistItem
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></ChecklistItem>
    <div class="comments-container">
      <textarea v-model="form_data.comments" placeholder="Comments" class="list-comment"></textarea>
    </div>
    <div class="centered">
      <button
        v-if="user_logged_in"
        :disabled="finished"
        @click="approveDay()"
        class="but-approve"
        type="button" name="button"
      >
        Approve<span v-show="finished">d</span>
      </button>
    </div>
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
    approveDay: function() {
      if (this.finished) return false;
      let post_data = this.form_data
      post_data.approved = true
      this.$store.dispatch('SAVE_CHOREDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>
