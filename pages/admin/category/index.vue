<template lang="pug">
AdminForm(label="Categories")
  AdminTable
    .search
      label(for="search") Search:
      input(type="text", v-model="search")
    table
      thead
        tr
          th #ID
          th Name
          th Status
          th Updated At
          th Action
      tbody
        tr(v-for="item in data", :key="item.id")
          td {{ item.id }}
          td {{ item.name }}
          td
            span.badge(:class="badgeClass(item)")
              | {{ item.status }}
          td {{ formatDate(item.updated_at) }}
          td
            nuxt-link.btn.btn--success(:to="`/category/` + item.id") Edit
            button.btn.btn--danger(@click="deleteItem(item.id)")
              | Delete
</template>
<script>
import AdminForm from "@/admin/form/Form.vue";
import AdminTable from "@/admin/form/AdminTable.vue";
export default {
  layout: "admin",
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
      return item.status === 1 ? "badge--success" : "badge--danger";
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
        .get("/category")
        .then((res) => {
          this.data = res.data.data.reverse();
          console.log(this.data, "this.data");
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    },
    deleteItem(id) {
      this.$axios
        .delete("/category/" + id)
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
