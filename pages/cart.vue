<template lang="pug">
  .cart
    .container
      h2.cart__title Shopping Cart
      .cart__wrap
        .cart__table(v-if="products.length")
          CartItem(v-for="product in products" :key="product._id" :product="product" :qty="getLocalStorageQty(product._id)" @itemPrice="itemPrice")
        h2.cart__no-products(v-else) No products
        .cart__total
          h2.cart__total-title Subtotal
          .cart__total-price
          el-button(type="success") Proceed to checkout
</template>

<script>
import CartItem from "../components/cart/CartItem";

export default {
  data() {
    return {
      products: [],
      productsIds: [],
      productsLocalStorage: []
    }
  },
  methods: {
    itemPrice(value) {
      console.log(value, 'value')
    },
    getLocalStorageQty(productId) {
      const product = this.productsLocalStorage.find(item => item.id === productId);
      return product.qty;
    }
  },
  computed: {
    getSubtotal() {

    }
  },
  components: {
    CartItem
  },
  mounted() {
    const productsLocalStorage = localStorage.getItem('shop_cart') ? JSON.parse(localStorage.getItem('shop_cart')) : null;
    if (productsLocalStorage) {
      this.productsLocalStorage = productsLocalStorage.products;
      const productsIds = productsLocalStorage.products.map(product => {
        return product.id;
      });

      this.productsIds = productsIds;

      this.$axios.$get(process.env.baseUrl + '/api/v1/product?ids=' + productsIds.join(',')).then(res => {
        this.products = res.records;
      }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message, 'err.response.data.message');
          this.$message.error(err.response.data.message);
          this.loading = false;
        } else if (err.request) {
          this.$message.error(err.request);
          console.log(err.request, 'err.request')
          this.loading = false;
        }
      });
    }
    // const products = this.$axios.$get(process.env.baseUrl + '/api/v1/product')
  }
}
</script>

<style lang="scss">
.cart {
  padding: 6rem 0;
  &__title {
    margin-bottom: 5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #ccc;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
  }
  &__table {
    width: 60%;
  }
  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding: 2rem;
    border-bottom: 1px solid #eee;
  }
  img {
    margin-right: 5rem;
  }
  &__total {
    width: 35%;
  }
}
</style>
