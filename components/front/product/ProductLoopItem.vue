<template>
  <div class="product-loop-item">
    <div class="product-loop-item__img">
      <img :src="`${server_url}/${product.img}`" :alt="product.title">
    </div>
    <div class="product-loop-item__content">
      <h3 class="product-loop-item__title">{{ product.title }}</h3>
      <nuxt-link :to="`/product/${product.id}`">Explore now</nuxt-link>
      <div class="product-loop-item__price">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
              d="M0 24C0 10.7 10.7 0 24 0H96c11.5 0 21.4 8.2 23.6 19.5L122 32H312V134.1l-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23V32H541.8c21.2 0 36.5 20.3 30.8 40.7l-54 192c-3.9 13.8-16.5 23.3-30.8 23.3h-317l9.1 48H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H160c-11.5 0-21.4-8.2-23.6-19.5L76.1 48H24C10.7 48 0 37.3 0 24zM224 464c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm240 48c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z"/>
        </svg>
        <span>{{ product.price }}$</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    server_url() {
      return this.$store.state.server_url + "/uploads";
    }
  }
}
</script>
<style lang="scss">
</style>
