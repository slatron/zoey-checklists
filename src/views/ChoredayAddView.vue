<template>
  <div class="choreday-add">
    <ChoredayAdd />
  </div>
</template>

<script>
import ChoredayAdd from '@/components/ChoredayAdd.vue'

export default {
  name: 'ChoredayAddView',
  components: {
    ChoredayAdd
  },
  created () {
    let person = this.$store.state.chores.current_person
    if (!('key' in person)) {
      this.$router.push('select-chorelist')
    }
  }
}
</script>
