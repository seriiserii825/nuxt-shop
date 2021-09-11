<template lang="pug">
  .language
    nuxt-link(v-if="$i18n.locale !== 'it'" :to="switchLocalePath('it')") It
    nuxt-link(v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')") En
</template>

<script>
export default {
  mounted() {
    // console.log(this.$i18n.locale, 'this.locale')
  },
}
</script>

<style lang="scss" scoped>
.language {
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
}
</style>
