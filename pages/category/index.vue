<template>
  <AdminForm label="Categories">
    <AdminTable>
      <div class="search">
        <label for="search">Search:</label>
        <input type="text" v-model="search" />
      </div>
      <table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <span class="badge" :class="badgeClass(item)">
                {{ item.status }}
              </span>
            </td>
            <td>{{ formatDate(item.updated_at) }}</td>
            <td>
              <nuxt-link class="btn btn--success" :to="`/category/` + item.id"
                >Edit</nuxt-link
              >
              <button class="btn btn--danger" @click="deleteItem(item.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </AdminTable>
  </AdminForm>
</template>
<script>
import AdminForm from "@/admin/form/Form.vue";
import AdminTable from "@/admin/form/AdminTable.vue";
export default {
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
