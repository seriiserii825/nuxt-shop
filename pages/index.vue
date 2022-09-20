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
      <div class="about-us">
        <h2 class="title">About us</h2>
        <div class="about-us__wrap">
          <div class="about-us__img">
            <img :src="`${server_url}/images/about-us.jpg`" alt="">
          </div>
          <div class="about-us__content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci, alias, asperiores atque
              autem beatae commodi consequatur cumque cupiditate delectus deleniti doloribus ea eius enim eos esse est
              et eum ex expedita explicabo facilis fuga fugiat fugit harum hic id illum impedit in incidunt inventore
              ipsa ipsam ipsum iste iure iusto laboriosam laborum laudantium libero magnam magni maiores maxime minima
              minus molestiae mollitia nam natus necessitatibus neque nesciunt nisi nobis non nostrum numquam obcaecati
              officia officiis omnis optio pariatur perferendis perspiciatis placeat praesentium provident quae quaerat
              quam quas qui quibusdam quidem quis quisquam quo quod quos ratione recusandae rem repellat reprehenderit
              repudiandae rerum saepe sapiente sed sequi sint sit soluta suscipit tempora temporibus tenetur totam ullam
              unde ut velit veniam veritatis vero voluptas voluptatem voluptates voluptatibus voluptatum. Ad, alias,
              aliquid, amet animi architecto asperiores atque autem beatae blanditiis commodi consequatur consequuntur
              corporis cumque cupiditate debitis dignissimos dolorem doloremque doloribus ducimus ea earum eius enim eos
              error est et eum ex excepturi expedita explicabo facilis fuga fugiat fugit harum hic id illum impedit in
              incidunt inventore ipsa ipsam ipsum iste iure iusto laboriosam laborum laudantium libero magnam magni
              maiores max</p>
          </div>
        </div>
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
