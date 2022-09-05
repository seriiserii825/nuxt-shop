<template lang="pug">
  AdminForm(label='Attributes values')
    AdminTable
      table
        thead
          tr
            th #ID
            th Title
            th Values
            th Action
        tbody
          tr(v-for='item in data', :key='item.id')
            td {{ item.id }}
            td {{ item.title }}
            td
              ul.admin-table__list
                li(v-for='value in item.values')
                  nuxt-link(:to='`/admin/attribute-value/` + item.id') {{ value.value }}
            td
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
      data: [],
    };
  },
  components: {
    AdminForm,
    AdminTable,
  },
  methods: {
    getData() {
      this.$axios
          .get("/auth/attribute")
          .then((res) => {
            this.data = res.data.data.reverse();
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
    deleteItem(id) {
      this.$axios
          .delete("/auth/attribute/" + id)
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
