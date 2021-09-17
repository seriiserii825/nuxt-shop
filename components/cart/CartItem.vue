<template lang="pug">
  .cart__row.cart-item
    nuxt-img(:src="`/uploads/${product.image}`" :width="100" :alt="product.title")
    h3.cart-item__title {{ product.title }}
    el-select.cart-item__qty(v-if="product.countInStock" v-model='qtySelected', placeholder='Select' @change="changeSelect")
      el-option(v-for='(item, index) in qtyItems' :key='item.value' :label='item.label' :value='item.value' )
    .cart-item__price
      strong $ {{ finalPrice }}
</template>

<script>
export default {
  props: ['product', 'qty'],
  data() {
    return {
      qtySelected: '1',
      qtyItems: []
    }
  },
  methods: {
    changeSelect() {
      this.$emit('itemPrice', this.finalPrice);
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
    this.qtyItems = this.product.countInStock ? this.generateArrayFromNumber(this.product.countInStock) : [];
    this.qtySelected = this.qty;
  }
}
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
}
</style>
