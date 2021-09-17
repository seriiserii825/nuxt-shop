<template lang="pug">
  .home
    .container
      h2(v-if="!records.length") Loading
      Products(v-else :products="records")
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
  data: () => {
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
