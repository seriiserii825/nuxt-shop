<template>
  <div class="category-page">
    <h3>{{ id }}</h3>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>
<style lang="scss"></style>
