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
      <AboutUs/>
    </div>
  </div>
</template>
<script>
import ProductLoop from "@/front/product/ProductLoop";
import AboutUs from "@/front/AboutUs";

export default {
  name: "IndexPage",
  data() {
    return {
      products: []
    }
  },
  components: {AboutUs, ProductLoop},
  methods: {
    getProducts() {
      this.$axios.get("/last-products").then((response) => {
        this.products = response.data.data;
      });
    }
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
