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
  components: {
  }
};
</script>

<style lang="scss">
.home {
  &__intro {
    position: relative;
    z-index: 1;
  }
  &__solutions {
    position: relative;
    z-index: 2;
  }
  &__chi-siamo {
    position: relative;
    z-index: 3;
  }
}
</style>
