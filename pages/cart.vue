<template lang="pug">
  .cart
    .container
      h2.cart__title Shopping Cart
      .cart__wrap(v-if="products.length")
        .cart__table
          CartItem(v-for="product in products" :key="product._id" :product="product" @itemPrice="itemPrice" @refreshProducts="refreshProducts")
        .cart__total
          h2.cart__total-title Subtotal
          .cart__total-price
            strong $ {{ subTotal }}
          el-button(type="success") Proceed to checkout
</template>

<script>
import CartItem from "../components/cart/CartItem";

export default {
  data() {
    return {
      products: [],
      productsIds: [],
      productsLocalStorage: [],
      subTotal: 0
    };
  },
  methods: {
    refreshProducts() {
      this.showLocalStorageProducts();
    },
    itemPrice() {
      this.subTotal = JSON.parse(localStorage.getItem("shop_cart")).total;
    },
    showLocalStorageProducts() {
      const productsLocalStorage = JSON.parse(
        localStorage.getItem("shop_cart")
      );

      if (productsLocalStorage) {
        const products = productsLocalStorage.products;
        this.subTotal = productsLocalStorage.total;
        this.productsLocalStorage = productsLocalStorage.products;

        const productsIds = productsLocalStorage.products.map((product) => {
          return product.id;
        });

        this.productsIds = productsIds;

        this.$axios
          .$get(
            process.env.baseUrl + "/api/v1/product?ids=" + productsIds.join(",")
          )
          .then((res) => {
            this.products = res.records;
            console.log(this.products, "this.products");
          })
          .catch((err) => {
            if (err.response) {
              console.log(
                err.response.data.message,
                "err.response.data.message"
              );
              this.$message.error(err.response.data.message);
              this.loading = false;
            } else if (err.request) {
              this.$message.error(err.request);
              console.log(err.request, "err.request");
              this.loading = false;
            }
          });
      }
    }
  },
  components: {
    CartItem
  },
  mounted() {
    this.showLocalStorageProducts();
  }
};
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
    width: 80%;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 20%;
    border: 1px solid #eee;
    &-price {
      padding: 2rem;
    }
  }
}
</style>
