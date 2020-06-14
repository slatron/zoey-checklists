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
    let user = this.$store.state.chores.current_user
    if (!('key' in user)) {
      this.$router.push('select-chorelist')
    }
  }
}
</script>
