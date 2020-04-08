<template>
  <label
    :class="{'done': formData[formKey]}"
    :for="'cb-' + formKey">
    {{formTitle}}
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
  }
}
</script>
