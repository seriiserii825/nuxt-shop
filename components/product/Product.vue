<template lang="pug">
  .product
    n-link.product__image(:to="`/product/${product._id}`")
      nuxt-img(:src="`/uploads/${product.image}`" :alt="product.title")
    .product__body
      h2.product__title {{ product.title }}
      .product__rating
        Rating(:rating="product.rating" :numReviews="product.numReviews")
      .product__price $ {{ product.price }}
</template>

<script>
import Rating from "./Rating";

export default {
  props: ['product'],
  components: {
    Rating
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/partials/variables";
.product {
  padding: 2rem;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 1rem;
  transition: all .4s;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
    border-color: $accent;
  }
  &__image {
    display: block;
  }
  &__body {
    padding: 1rem;
  }
  &__title {
    margin-bottom: 2rem;
    font-size: 2rem;
    transition: all .4s;
  }
  &__rating {
    margin-bottom: 2rem;
  }
  &__price {
    font-weight: bold;
  }
}
</style>
