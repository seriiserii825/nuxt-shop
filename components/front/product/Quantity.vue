<template>
  <div class="quantity">
    <button class="quantity__btn quantity__dec" @click="decrement">-</button>
    <input type="number" v-model="current">
    <button class="quantity__btn quantity__inc" @click="increment">+</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1
    }
  },
  methods: {
    increment() {
      this.current++;
      this.$emit('on-change', this.current);
    },
    decrement() {
      if (this.current > 1) {
        this.current--;
        this.$emit('on-change', this.current);
      }
    }
  }
}
</script>
<style lang="scss">
</style>
