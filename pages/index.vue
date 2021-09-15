<template lang="pug">
  .home
    .container
      Products(:products="records")
</template>

<script>
import Products from "../components/product/Products";

export default {
  async asyncData({ $axios }) {
    const { records } = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/"
    );
    return { records };
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
  components: { Products }
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
