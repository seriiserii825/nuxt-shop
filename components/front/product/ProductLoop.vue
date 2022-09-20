<template>
  <div :class="`product-loop product-loop--${count}`">
    <div class="product-loop__item" v-for="product in products" :key="product.id">
      <ProductLoopItem :product="product"/>
    </div>
  </div>
</template>
<script>
import ProductLoopItem from "@/front/product/ProductLoopItem";

export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      default: 4
    }
  },
  components: {ProductLoopItem}
}
</script>
