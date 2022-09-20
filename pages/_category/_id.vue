<template>
  <div class="category-page">
    <div class="container">
      <ul class="breadcrumbs">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li v-if="parent_menu">
          <span>{{ parent_menu.title }}</span>
        </li>
        <li v-if="children_menu">
          <span>{{ children_menu.title }}</span>
        </li>
      </ul>
      <div class="category-page__wrap">
        <main class="category-page__content">
          <ProductLoop v-if="products && products.length > 0" :products="products" :count="3"/>
          <h3 v-else>No products found....</h3>
        </main>
        <aside class="category-page__sidebar">
          <CategoryFilter :categories="categories_with_children" @on-change="categoryFilterHandler"/>
        </aside>
      </div>
    </div>
  </div>
</template>
<script>
import ProductLoop from "@/front/product/ProductLoop";
import CategoryFilter from "@/front/product/CategoryFilter";

export default {
  components: {CategoryFilter, ProductLoop},
  layout: 'default',
  data() {
    return {
      id: null,
      parent_menu: {},
      children_menu: {},
      categories: [],
      categories_with_children: [],
      products: [],
      categories_ids: [],
    };
  },
  methods: {
    categoryFilterHandler(ids) {
      this.categories_ids = ids;
      this.getProducts();
    },
    getProducts() {
      this.$axios.post(`/filter-products`, {
        "categories": JSON.stringify(this.categories_ids),
      }).then((response) => {
        this.products = response.data.data;
      });
    },
    getCategories() {
      this.$axios
          .get("/category")
          .then((res) => {
            this.categories = res.data.data;
            const parents = this.categories.filter(
                (item) => item.parent_id === 0
            );

            this.categories_with_children = parents.map((parent) => {
              const children = this.categories.filter(
                  (item) => item.parent_id === parent.id
              );
              return {
                ...parent,
                children,
              };
            });

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
    this.categories_ids.push(this.id);
    this.getCategories();
    this.getProducts();
  }
};
</script>
<style lang="scss"></style>
