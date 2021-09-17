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

        el-select.single-product__qty(v-if="record.countInStock" v-model='qtySelected', placeholder='Select')
          el-option(v-for='(item, index) in qtyItems' :key='item.value' :label='item.label' :value='item.value' )
        el-button(type="primary" :disabled="!record.countInStock" @click="addToCart") Add to cart
</template>

<script>
import Rating from "../../components/product/Rating";

export default {
  async asyncData({ $axios, params }) {
    let { record } = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/" + params.id + '?category=true'
    );
    return {
      record
    };
  },
  data() {
    return {
      qtySelected: 1,
      qtyItems: [],
    }
  },
  mounted() {
    if (this.record.countInStock) {
      const result = [];
      for (let i = 1; i <= this.record.countInStock; i++) {
        result.push({
          value: i,
          label: i
        });
      }
      this.qtyItems = result;
    }
  },
  methods: {
    addToCart() {
      const product = { id: this.record._id, title: this.record.title, qty: this.qtySelected };

      if (!localStorage.getItem('shop_cart')) {
        const cart = {
          userId: new Date().valueOf(),
          products: []
        }
        cart.products.push(product);
        localStorage.setItem('shop_cart', JSON.stringify(cart));
      } else {
        let localStorageCart = JSON.parse(localStorage.getItem('shop_cart'));
        const idx = localStorageCart.products.find(product => product.id === this.record._id);

        if (idx) {
          localStorageCart.products = localStorageCart.products.map(product => {
            if (product.id === this.record._id) {
              product.qty = this.qtySelected;
              return product;
            }
            return product;
          });

          localStorage.setItem('shop_cart', JSON.stringify(localStorageCart));
        } else {
          localStorageCart.products.push(product);
          localStorage.setItem('shop_cart', JSON.stringify(localStorageCart));
        }
      }
    }
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
  &__qty {
    margin-right: 2rem;
    width: 10rem;
  }
}
</style>
