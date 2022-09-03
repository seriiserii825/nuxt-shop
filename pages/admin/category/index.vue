<template lang="pug">
AdminForm(label="Categories")
  .admin-list(v-if="hierarchy && hierarchy.length")
    .admin-list__item(v-for="item in hierarchy", :key="item.id")
      .admin-list__parent {{ item.title }}
      .admin-list__children(
        v-for="subitem in item.children",
        :key="subitem.id"
      )
        span -- {{ subitem.title }}
        .admin-list__actions
          nuxt-link.btn.btn--success(:to="`/admin/category/` + subitem.id") Edit
          button.btn.btn--danger(@click="deleteItem(subitem.id)") Delete
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
      hierarchy: [],
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
        .get("/auth/category")
        .then((res) => {
          this.data = res.data.data.reverse();
          console.log(this.data, "this.data");
          const parents = this.data.filter((item) => item.parent_id === 0);
          const children = this.data.map((item) => {
            if (item.parent_id !== 0) {
              const parent = this.data.find(
                (parent) => parent.id === item.parent_id
              );
              return {
                ...item,
                parent: parent.title,
              };
            } else {
              return item;
            }
          });
          this.hierarchy = parents.map((parent) => {
            return {
              ...parent,
              children: children.filter(
                (child) => child.parent_id === parent.id
              ),
            };
          });
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    },
    deleteItem(id) {
      this.$axios
        .delete("/auth/category/" + id)
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
