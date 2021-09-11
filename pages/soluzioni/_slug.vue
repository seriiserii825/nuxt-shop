<template lang="pug">
 .container
   h2  {{ pageTitle }}
</template>

<script>
 export default {
  computed: {
    pageTitle(){
      return this.$route.params.slug;
    }
  }
 }
</script>

<style lang="scss">

</style>
