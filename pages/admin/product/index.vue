<template lang="pug">
AdminForm(label="Products")
  AdminTable
    table
      thead
        tr
          th #ID
          th Img
          th Title
          th Category
          th Sum
          th Status
          th Action
      tbody
        tr(v-for="item in data", :key="item.id")
          td {{ item.id }}
          td 
            img(:src="`${server_url}/uploads/${item.img}`", alt="img", width="100")
          td {{ item.title }}
          td {{ item.category }}
          td {{ item.price }}
          td {{ item.status === '1' ? 'On' : 'Off' }}
          td
            nuxt-link.btn.btn--success(:to="`/admin/product/` + item.id") Edit
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
        .get("/auth/product")
        .then((res) => {
          this.data = res.data.data.reverse();
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    },
    deleteItem(id) {
      this.$axios
        .delete("/auth/product/" + id)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          console.log(err.response.data.message, "err.response");
        });
    },
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    },
  },
  created() {
    this.getData();
  },
};
</script>
