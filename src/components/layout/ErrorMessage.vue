<template lang="html">
  <section
    v-show="error_msg.length"
    class="site-error-message block-area"
    @click="clearError()"
  >
    {{error_msg}}
  </section>
</template>

<script>
export default {
  name: 'ErrorMessage',
  computed: {
    error_msg () {
      return this.$store.state.layout.error_msg
    },
  },
  methods: {
    clearError: function() {
      this.$store.commit('SET_ERROR_MESSAGE', '')
    }
  }
}
</script>

<style lang="css" scoped>
.site-error-message {
  background: pink;
  border-radius: 1em;
  border: 2px solid red;
  cursor: pointer;
  font-weight: bold;
}
</style>
