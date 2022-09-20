<template>
  <div class="category-page">
    <div class="container">
      <ul class="breadcrumbs">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li v-if="parent_menu">
          <nuxt-link :to="`/category/${parent_menu.id}`">{{ parent_menu.title }}</nuxt-link>
        </li>
        <li v-if="children_menu">
          <span>{{ children_menu.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      id: null,
      parent_menu: {},
      children_menu: {},
      categories: []
    };
  },
  methods: {
    getCategories() {
      this.$axios
          .get("/category")
          .then((res) => {
            this.categories = res.data.data;
            const parents = this.categories.filter(
                (item) => item.parent_id === 0
            );

            const is_parent = parents.some(item => {
              return item.id === this.id;
            });

            if (is_parent) {
              const parent_array = parents.filter(item => item.id === this.id);
              this.parent_menu = parent_array[0] ? {id: parent_array[0].id, title: parent_array[0].title} : null;
            } else {
              const children_array = this.categories.filter(item => item.id === this.id);
              this.children_menu = children_array[0] ? {
                id: children_array[0].id,
                title: children_array[0].title
              } : null;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getCategories();
  }
};
</script>
<style lang="scss"></style>
