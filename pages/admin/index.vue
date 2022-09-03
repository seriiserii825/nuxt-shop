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
                    span.badge(:class="{'badge--success': item.status === '0', 'badge--error': item.status === '2'}") {{orderStatus(item.status)}}
                  td {{item.sum}}
      .admin__column
        AdminForm(label="Categories")
          AdminTable
            table
              thead
                tr
                  th #ID
                  th Name
                  th Status
                  th Updated At
              tbody
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
      orders: []
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
    orderStatus(status) {
      switch (status) {
        case "0":
          return "New";
        case "1":
          return "Finished"
        case "2":
          return "Deleted"
      }
    }
  },
  components: {
    InfoWidget,
  },
  created() {
    this.getAdminWidgets();
    this.getOrders();
  },
};
</script>
