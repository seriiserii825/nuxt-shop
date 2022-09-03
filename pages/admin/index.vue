<template lang="pug">
  .admin
    .admin__widgets
      .admin__widgets-item
        InfoWidget(
          :count="orders_count",
          subtitle="Orders",
          title="New orders",
          url="/admin/order",
          background="#f14453",
          icon="/svg/product.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="products_count",
          subtitle="Products",
          title="New products",
          url="/admin/product",
          background="#5744f1",
          icon="/svg/orders.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="users_count",
          subtitle="Users",
          title="New users",
          url="/admin/product",
          background="#259b64",
          icon="/svg/users.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="categories_count",
          subtitle="Category",
          title="New categories",
          url="/admin/category",
          background="#ad5517",
          icon="/svg/category.svg"
        )
    .admin__container
      .admin__column
        AdminForm(label="Orders")
          AdminTable
            table
              thead
                tr
                  th #ID
                  th User
                  th Status
                  th Sum
              tbody
                tr(v-for="item in orders" :key="item.id")
                  td {{item.id}}
                  td {{item.user.name}}
                  td
                    span.badge(:class="badgeClass(item.status)") {{orderStatus(item.status)}}
                  td {{item.sum}}
      .admin__column
        AdminForm(label="Last products")
          .admin-products(v-if="products && products.length")
            nuxt-link(:to="`/admin/product/${item.id}`").admin-products__item(v-for="item in products" :key="item.id")
              .admin-products__img
                img(:src="adminProductsImage()" alt="no image")
              .admin-products__content
                header.admin-products__header
                  h3.admin-products__title {{item.title}}
                  .admin-products__price
                    strong {{ item.price }}$
                .admin-products__description {{ item.description }}
</template>

<script>
import InfoWidget from "@/admin/widgets/InfoWidget.vue";

export default {
  layout: "admin",
  data() {
    return {
      orders_count: 0,
      products_count: 0,
      users_count: 0,
      categories_count: 0,
      orders: [],
      products: []
    };
  },
  methods: {
    getAdminWidgets() {
      this.$axios
          .get("/auth/admin")
          .then((response) => {
            this.orders_count = response.data.orders_count;
            this.products_count = response.data.products_count;
            this.users_count = response.data.users_count;
            this.categories_count = response.data.categories_count;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getOrders() {
      this.$axios.get("/auth/order")
          .then(response => {
            this.orders = response.data.data;
          }).catch(error => {
        console.log(error.response, 'error.response');
      });
    },
    getProducts() {
      this.$axios.get("/auth/product")
          .then(response => {
            this.products = response.data.data;
          }).catch(error => {
        console.log(error.response, 'error.response');
      });
    },
    orderStatus(status) {
      console.log(status, 'status')
      switch (status) {
        case "0":
          return "New";
        case "1":
          return "Finished"
        case "2":
          return "Deleted"
      }
    },
    badgeClass(status) {
      switch (status) {
        case "0":
          return "badge--success";
        case "1":
          return "";
        case "2":
          return "badge--error";
      }
    },
    adminProductsImage() {
      return '/images/no-image.jpg';
    }
  },
  components: {
    InfoWidget,
  },
  created() {
    this.getAdminWidgets();
    this.getOrders();
    this.getProducts();
  },
};
</script>
