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
      related_ids: [],
      quantity: 1,
    };
  },
  methods: {
    addToCart() {
      const cart = this.$store.state.cart;
      const product = {
        id: this.product.id,
        title: this.product.title,
        price: this.price,
        quantity: this.quantity,
        image: this.product.img
      };

      let cart_items = JSON.parse(JSON.stringify(cart.items));

      if (cart_items.length > 0) {
        const index = cart_items.findIndex(item => item.id === product.id);
        if (index !== -1) {
          cart_items[index].quantity += product.quantity;
        } else {
          cart_items.push(product);
        }
      } else {
        cart_items.push(product);
      }

      const total = cart_items.reduce((total, item) => total + item.price * item.quantity, 0);
      const total_quantity = cart_items.reduce((total, item) => total + item.quantity, 0);

      this.$store.dispatch('setCart', {items: cart_items, total: total, quantity: total_quantity});
      this.$store.dispatch('toggleCart', true);
    },
    changeQuantity(quantity) {
      this.price = this.product.price * quantity;
      this.quantity = quantity;
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

        this.gallery.push(this.product.img);
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
