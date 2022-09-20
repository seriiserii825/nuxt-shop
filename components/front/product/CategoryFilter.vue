<template>
  <div class="category-filter">
    <div class="category-filter__item" v-for="item in categories" :key="item.id">
      <h3 class="category-filter__title">{{ item.title }}</h3>
      <ul v-if="item.children && item.children.length">
        <li v-for="child in item.children">
          <input type="checkbox" @change="checkboxHandler(child.id)" :id="child.id" :value="child.id" v-model="current">
          <label :for="child.id">{{ child.title }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      current: []
    }
  },
  methods: {
    checkboxHandler(id) {
      this.$emit('on-change', this.current);
    }
  },
  created() {
    // console.log(this.categories);
  }
}
</script>
<style lang="scss">
</style>
