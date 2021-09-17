<template lang="pug">
  .product
    .product__image
      nuxt-img(:src="`/uploads/${product.image}`" :alt="product.title")
    .product__body
      h2.product__title {{ product.title }}
      .product__rating
        Rating(:rating="product.rating" :numReviews="product.numReviews")
      .product__stock
        .success(v-if="product.countInStock")
          strong In stock
        .error(v-else)
          strong Out of stock
      .product__price Price: $ {{ product.price }}
      el-button(type="success")
        n-link(:to="`/product/${product._id}`") View product
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
  }
  &__title {
    margin-bottom: 2rem;
    font-size: 2rem;
    transition: all .4s;
    min-height: 5rem;
  }
  &__rating {
    margin-bottom: 2rem;
  }
  &__stock {
    margin-top: auto;
    padding-bottom: 1rem;
  }
  &__price {
    margin-bottom: 2rem;
    font-weight: bold;
  }
}
</style>
