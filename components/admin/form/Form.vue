<template>
  <div class="form">
    <header class="form__header">{{ label }}</header>
    <div class="form__body"><slot></slot></div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss"></style>
