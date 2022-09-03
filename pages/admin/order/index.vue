<template lang="pug">
  AdminForm(label='Categories')
    AdminTable
      .search
        label(for='search') Search:
        input(type='text', v-model='search')
      table
        thead
          tr
            th #ID
            th User
            th Status
            th Sum
            th Updated At
            th Created At
            th Action
        tbody
          tr(v-for='item in data', :key='item.id')
            td {{ item.id }}
            td {{ item.user.name }}
            td
              span.badge(:class='badgeClass(item)')
                | {{ orderStatus(item.status) }}
            td {{ item.sum }}
            td {{ formatDate(item.updated_at) }}
            td {{ formatDate(item.created_at) }}
            td
              nuxt-link.btn.btn--success(:to='`/admin/order/` + item.id') Edit
              button.btn.btn--danger(@click='deleteItem(item.id)')
                | Delete
</template>
<script>
import AdminForm from "@/admin/form/Form.vue";
import AdminTable from "@/admin/form/AdminTable.vue";

export default {
  layout: 'admin',
  data() {
    return {
      search: "",
      data: [],
    };
  },
  components: {
    AdminForm,
    AdminTable,
  },
  methods: {
    badgeClass(item) {
      switch (item.status) {
        case "0":
          return "badge--success";
        case "1":
          return "";
        case "2":
          return "badge--danger";
      }
    },
    formatDate(date) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      return new Intl.DateTimeFormat("en", options).format(new Date(date));
    },
    getData() {
      this.$axios
          .get("/auth/order")
          .then((res) => {
            this.data = res.data.data.reverse();
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
    deleteItem(id) {
      this.$axios
          .delete("/auth/order/" + id)
          .then(() => {
            this.getData();
          })
          .catch((err) => {
            console.log(err.response.data.message, "err.response");
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
    },
  },
  created() {
    this.getData();
  },
};
</script>
