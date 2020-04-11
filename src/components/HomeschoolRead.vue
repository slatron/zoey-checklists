<template>
  <div class="homeschool-read">
    <section
      v-for="(day, idx) in days"
      :key="idx"
    >
      <p><b>Date</b>: {{ day.date | toDate }}<p>
      <p><b>Reading</b>: {{day.reading}}</p>
      <p><b>Writing</b>: {{day.writing}}</p>
      <p><b>Math</b>: {{day.math}}</p>
      <p><b>Science</b>: {{day.science}}</p>
      <p><b>Gym</b>: {{day.gym}}</p>
      <p><b>Special</b>: {{day.special}}</p>
      <p><b>Approved</b>: {{day.approved}}</p>
      <p><b>Comments</b>: {{day.comments}}</p>
    </section>
  </div>
</template>

<script>
import { db } from '../db'
import { Timestamp } from '../db'

export default {
  name: 'HomeschoolRead',
  data() {
    return {
      days: []
    }
  },
  firestore: {
    days: db.collection('homeschool')
  },
  filters: {
    toDate: function(value) {
      return value.toDate().toString().substr(0, 15)
    }
  }
}
</script>

<style scoped lang="scss">
  section {
    padding: 1em;
    margin: 1em;
    border-bottom: 2px dotted lime;
  }
</style>
