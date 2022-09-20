<template>
  <div class="product-loop">
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
    }
  },
  components: {ProductLoopItem}
}
</script>
