<template lang="pug">
.admin
  .admin__content
    .admin__widgets
      .admin__widgets-item
        InfoWidget(
          :count="orders_count",
          subtitle="Orders"
          title="New orders",
          url="/admin/order"
          background="#f14453"
          icon="/svg/product.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="products_count",
          subtitle="Products"
          title="New products",
          url="/admin/product"
          background="#5744f1"
          icon="/svg/orders.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="users_count",
          subtitle="Users"
          title="New users",
          url="/admin/product"
          background="#259b64"
          icon="/svg/users.svg"
        )
      .admin__widgets-item
        InfoWidget(
          :count="categories_count",
          subtitle="Category"
          title="New categories",
          url="/admin/category"
          background="#ad5517"
          icon="/svg/category.svg"
        )
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
  },
  components: {
    InfoWidget,
  },
  created() {
    this.getAdminWidgets();
  },
};
</script>
