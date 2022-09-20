<template>
  <div class="product-gallery">
    <div class="product-gallery__img">
      <transition name="fade" mode="in-out" appear>
        <img v-if="was_changed" :src="`${server_url}${gallery[current_index]}`" alt="">
      </transition>
    </div>
    <div v-if="gallery.length > 1" class="product-gallery__wrap">
      <div
          v-for="(item, index) in gallery"
          :key="item" @click="galleryHandler(index)"
          class="product-gallery__item"
          :class="{'active': index === current_index}"
      >
        <img :src="`${server_url}${item}`" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    gallery: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current_index: 0,
      was_changed: true
    }
  },
  methods: {
    galleryHandler(index) {
      this.was_changed = false;
      this.current_index = index;
      setTimeout(() => {
        this.was_changed = true;
      }, 300);
    }
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    }
  },
  created() {
    this.current = this.gallery[0];
  }
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
