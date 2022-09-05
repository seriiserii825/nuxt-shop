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
            th Name
            th email
            th Role
            th Action
        tbody
          tr(v-for='item in data', :key='item.id')
            td {{ item.id }}
            td {{ item.name }}
            td {{ item.email }}
            td {{ item.role }}
            td
              nuxt-link.btn.btn--success(:to='`/admin/user/` + item.id') Edit
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
          .get("/auth/user-get-all")
          .then((res) => {
            this.data = res.data.data.reverse();
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
    deleteItem(id) {
      this.$axios
          .delete("/auth/user/" + id)
          .then(() => {
            this.getData();
          })
          .catch((err) => {
            console.log(err.response.data.message, "err.response");
          });
    },
  },
  created() {
    this.getData();
  },
};
</script>
