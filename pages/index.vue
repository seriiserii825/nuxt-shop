<template lang="pug">
  .home
</template>

<script>

export default {
  async asyncData({ $axios }) {
    return {
      some: ''
    }
  },
  head: {
    title: "Home",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Content for home page"
      }
    ]
  },
  components: {}
};
</script>

<style lang="scss">
</style>
