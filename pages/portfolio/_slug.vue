<template lang="pug">
  .single-portfolio
    .container
      h1 {{ pageTitle }}
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return this.$route.params.slug;
    }
  },
  mounted() {
    console.log(this.$route, 'this.$route')
  }
}
</script>

<style lang="scss">

</style>
