<template>
  <label
    :class="{'done': formData[formKey]}"
    class="big-label"
    :for="'cb-' + formKey">
    {{actual_title}}
    <font-awesome-icon icon="laugh-wink" />
    <input type="checkbox" :name="'cb-' + formKey" :id="'cb-' + formKey" v-model="formData[formKey]">
  </label>
</template>

<script>
export default {
  name: 'BigLabel',
  props: {
    formData: { 'type': Object, 'default': {} },
    formKey: { 'type': String, 'default': '' },
    formTitle: { 'type': String, 'default': ''}
  },
  computed: {
    actual_title () {
      return this.formTitle === 'Special'
        ? this.formData.special_choice
        : this.formTitle
    }
  }
}
</script>
