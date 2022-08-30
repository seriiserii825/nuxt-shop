<template lang="pug">
  .notify
    .notify__wrap
      .notify__text {{text}}
      .notify__close(@click="hideNotify")  x
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
  },
  methods: {
    hideNotify() {
      this.$store.commit('hideNotify');
    },
  },
}
</script>
<style lang="scss">
</style>
