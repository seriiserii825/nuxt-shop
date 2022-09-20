<template>
  <div class="home">
    <div class="home-intro">
      <img src="/images/shop-intro.jpg" alt="">
    </div>
    <div class="container">
      <div class="last-products">
        <h2 class="title">Last products</h2>
        <ProductLoop :products="products"/>
      </div>
    </div>
  </div>
</template>
<script>
import ProductLoop from "@/front/product/ProductLoop";

export default {
  name: "IndexPage",
  data() {
    return {
      products: []
    }
  },
  components: {ProductLoop},
  methods: {
    getProducts() {
      this.$axios.get("/last-products").then((response) => {
        this.products = response.data.data;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
