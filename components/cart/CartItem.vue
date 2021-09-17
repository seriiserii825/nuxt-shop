<template lang="pug">
  .cart__row.cart-item(v-if="product")
    nuxt-img(:src="`/uploads/${product.image}`" :width="100" :alt="product.title")
    h3.cart-item__title {{ product.title }}
    el-select.cart-item__qty(v-if="product.countInStock" v-model='qtySelected', placeholder='Select' @change="changeSelect")
      el-option(v-for='(item, index) in qtyItems' :key='item.value' :label='item.label' :value='item.value' )
    .cart-item__price
      strong $ {{ finalPrice.toFixed(2) }}
    el-button.cart-item__remove(type="danger" @click="removeItem") Remove
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      qtySelected: "1",
      qtyItems: []
    };
  },
  methods: {
    removeItem() {
      this.$store.dispatch("removeFromLocalStorage", { id: this.product._id });
      this.$emit("refreshProducts");
    },
    changeSelect() {
      let productsLocal = JSON.parse(localStorage.getItem("shop_cart"));
      productsLocal.products = productsLocal.products.map((item) => {
        if (this.product._id === item.id) {
          item.qty = this.qtySelected;
          return item;
        }
        return item;
      });
      productsLocal.total = productsLocal.products.reduce((sum, current) => {
        return sum + current.price * current.qty;
      }, 0);
      localStorage.setItem("shop_cart", JSON.stringify(productsLocal));
      this.$emit("itemPrice");

      this.$store.dispatch("addProductsToLocalStorage", {
        id: this.product._id,
        qty: this.qtySelected,
        product: this.product
      });
    },
    generateArrayFromNumber(num) {
      const result = [];
      for (let i = 1; i <= num; i++) {
        result.push({
          value: i,
          label: i
        });
      }
      return result;
    }
  },
  computed: {
    finalPrice() {
      return this.qtySelected * this.product.price;
    }
  },
  mounted() {
    const productsLocal = JSON.parse(localStorage.getItem("shop_cart"));

    this.qtySelected = productsLocal.products
      ? productsLocal.products.find(
          (product) => product.id === this.product._id
        ).qty
      : 1;

    this.qtyItems = this.product.countInStock
      ? this.generateArrayFromNumber(this.product.countInStock)
      : [];
  }
};
</script>

<style lang="scss">
.cart-item {
  &__qty {
    margin-left: auto;
    width: 10rem;
  }
  &-title {
    margin-right: auto;
    text-align: left;
  }
  &__price {
    width: 12rem;
    text-align: right;
  }
  &__remove {
    margin-left: 1rem;
  }
}
</style>
