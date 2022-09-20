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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductGallery from "@/front/product/ProductGallery";
import Quantity from "@/front/product/Quantity";

export default {
  components: {Quantity, ProductGallery},
  layout: 'default',
  data() {
    return {
      id: null,
      product: null,
      gallery: [],
      price: null
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
        this.gallery.push('/uploads/' + this.product.img);
        const gallery = this.product.gallery ? JSON.parse(this.product.gallery) : [];

        if (gallery.length > 0) {
          this.gallery = [...this.gallery, ...gallery];
        }
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
