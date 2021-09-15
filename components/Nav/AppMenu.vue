<template lang="pug">
  ul.main-menu
    li
      nuxt-link(to="/") Home
    li
      nuxt-link(to="/product") Products

</template>
<script>
export default {
  props: {
    active: {
      type: Boolean
    }
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/partials/variables";
@import "@/assets/scss/blocks/main-menu";
</style>
