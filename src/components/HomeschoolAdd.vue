<template>
  <div class="homeschool-area big-label-area">
    <BigLabel
      v-for="label in labels"
      :key="label.key"
      :form-data="form_data"
      :form-key="label.key"
      :form-title="label.name"
    ></BigLabel>
    <label
      v-if="user_logged_in"
      :class="{'done': approved}"
      class="approved"
      for="cb-approved">
      Approved
      <font-awesome-icon icon="laugh-wink" />
      <input type="checkbox" name="cb-approved" id="cb-approved" v-model="approved">
    </label>
    <textarea v-model="form_data.comments" placeholder="Comment"></textarea>
    <button
      v-if="approved"
      @click="saveDay()"
      class="but-save">
      SAVE
    </button>
  </div>
</template>

<script>
// Fields:
import { db, Auth } from '../db'
import { Timestamp } from '../db'
import BigLabel from '@/components/BigLabel'

export default {
  name: 'HomeschoolDay',
  components: {
    BigLabel
  },
  data() {
    return {
      days: [],
      labels: [
        {key: 'math', name: 'Math'},
        {key: 'science', name: 'Science'},
        {key: 'reading', name: 'Reading'},
        {key: 'writing', name: 'Writing'},
        {key: 'gym', name: 'Gym'},
        {key: 'special', name: 'Special'}
      ],
      form_data: {
        comments: '',
        date: Timestamp.fromDate(new Date()),
        math: false,
        reading: false,
        science: false,
        gym: false,
        special: false,
        writing: false
      },
      approved: false,
      user_logged_in: false,
    }
  },
  firestore: {
    days: db.collection('homeschool')
  },
  created: function() {
    const vm = this
    Auth.onAuthStateChanged(function(user) {
      if (user) {
        vm.user_logged_in = true
      } else {
        vm.user_logged_in = false
      }
    });
  },
  methods: {
    saveDay: function() {
      // Eventually, we should be enforcing one per day
      // let dates = this.days.map(day => day.date)
      const adultCheck = prompt("What is the parent password?")
      if (adultCheck === 'b') {
        let post_data = this.form_data
        post_data.approved = true
        console.log('Saving ', post_data)
        db.collection('homeschool')
          .add(post_data)
      }
    }
  },
  watch: {
    approved: function(checked) {
      if (checked) {
        const adultCheck = prompt("YO! Wassa Password, Fool?")
        if (adultCheck !== 'a') {
          this.approved = false
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

textarea {
  width: 100%;
  min-height: 100px;
  font-size: 36px;
}

</style>
