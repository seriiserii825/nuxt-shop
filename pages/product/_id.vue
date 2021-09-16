<template lang="pug">
  .container
    .single-product
      .single-product__image
        nuxt-img(:src="`/uploads/${record.image}`")
      .single-product__body
        ul
          li
            h1.single-product__title {{ record.title }}
          li
            Rating(:rating="record.rating" :numReviews="record.numReviews")
          li
            h4 Category: {{ record.category.title }}
          li
            h4 Price: <strong>$ {{ record.price }}</strong>
          li {{ record.description }}
          li
            h4 Status:
              span.stock.success(v-if="record.countInStock") In Stock
              span.stock.error(v-else) Out of Stock
        el-button(type="primary" :disabled="!record.countInStock") Add to cart
</template>

<script>
import Rating from "../../components/product/Rating";

export default {
  async asyncData({ $axios, params }) {
    let { record } = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/" + params.id + '?category=true'
    );
    console.log(record, 'record');
    // let categories = await $axios.$get(process.env.baseUrl + "/api/v1/category/");
    return {
      record
    };
  },
  components: {
    Rating
  }
}
</script>
<style lang="scss">
.single-product {
  display: flex;
  justify-content: space-between;
  padding: 6rem 0 10rem;
  min-height: 90vh;
  &__image {
    width: 50%;
  }
  &__body {
    width: 50%;
  }
  ul {
    li {
      padding: 2rem 0;
      border-top: 1px solid #eee;
    }
  }
  .stock {
    display: inline-block;
    padding-left: 0.4rem;
    &.success {
      color: green;
    }
    &.error {
      color: red;
    }
  }
}
</style>
