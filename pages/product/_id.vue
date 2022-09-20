<template>
  <div class="single-product">
    <div class="container">
      <div class="single-product__wrap">
        <div class="single-product__gallery">
          <ProductGallery :gallery="gallery"/>
        </div>
        <div class="single-product__content" v-if="product">
          <h2 class="title">{{ product.title }}</h2>
          <div class="single-product__text">{{ product.content }}</div>
          <div class="single-product__category">Category: <strong>{{ product.category }}</strong></div>
          <div class="single-product__add-to-cart">
            <div class="single-product__price">{{ price }}$</div>
            <div class="single-product__quantity">
              <Quantity @on-change="changeQuantity"/>
            </div>
            <button class="btn" @click="addToCart">Add to cart</button>
          </div>
          <div class="single-product__related-products" v-if="related_products.length > 0">
            <h3 class="title">Related products</h3>
            <ProductLoop :products="related_products"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductGallery from "@/front/product/ProductGallery";
import Quantity from "@/front/product/Quantity";
import ProductLoop from "@/front/product/ProductLoop";

export default {
  components: {ProductLoop, Quantity, ProductGallery},
  layout: 'default',
  data() {
    return {
      id: null,
      product: null,
      gallery: [],
      price: null,
      related_products: [],
      related_ids: []
    };
  },
  methods: {
    addToCart() {
    },
    changeQuantity(quantity) {
      this.price = this.product.price * quantity;
    },
    getProduct() {
      this.$axios.get(`/single-product/${this.id}`).then((response) => {
        this.product = response.data.data;
        this.price = this.product.price;
        this.related_ids = JSON.parse(this.product.related);
        this.related_ids = this.related_ids.map(item => {
          return item.id;
        });
        this.getRelatedProducts();

        this.gallery.push('/uploads/' + this.product.img);
        const gallery = this.product.gallery ? JSON.parse(this.product.gallery) : [];
        if (gallery.length > 0) {
          this.gallery = [...this.gallery, ...gallery];
        }
      });
    },
    getRelatedProducts() {
      this.$axios.post('/related-products', {related: JSON.stringify(this.related_ids)}).then((response) => {
        this.related_products = response.data.data;
      });
    }
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getProduct();
  }
};
</script>
<style lang="scss"></style>
