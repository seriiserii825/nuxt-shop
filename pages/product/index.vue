<template lang="pug">
  .home
    .container
      Products(:products="records")
</template>

<script>
import Products from "../../components/product/Products";

export default {
  async asyncData({ $axios }) {
    const { records } = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/"
    );
    return { records };
  },
  head: {
    title: "Products",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Content for products page"
      }
    ]
  },
  components: { Products }
};
</script>
