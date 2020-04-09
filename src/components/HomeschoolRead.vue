<template>
  <div class="homeschool-read">
    {{ days }}
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
  }
}
</script>

<style scoped lang="scss">
</style>
