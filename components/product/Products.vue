<template lang="pug">
  .products
    h2.products__title Latest products
    .products__wrap
      Product(v-for="product in products" :key="product._id" :product="product")
</template>

<script>
import Product from "./Product";

export default {
  props: ['products'],
  components: {
    Product
  }
}
</script>
<style lang="scss">
.products {
  padding: 6rem 0 10rem;
  &__title {
    margin-bottom: 4rem;
  }
  &__wrap {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
    grid-gap: 3rem;
  }
}
</style>
