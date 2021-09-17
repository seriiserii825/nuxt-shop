<template lang="pug">
  .home
    .container
      Products(:products="products")
</template>

<script>
import Products from "../components/product/Products";

export default {
  async asyncData({ $axios }) {
    const products = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/"
    );

    return {
      products: products.records
    };
  },
  data() {
    return {
      loading: true
    };
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
