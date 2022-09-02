<template>
  <AdminForm label="Returned books">
    <AdminTable>
      <div class="search">
        <label htmlFor="search">Search:</label>
        <input type="text" v-model="search" />
      </div>
      <table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Category</th>
            <th>Book</th>
            <th>Client</th>
            <th>Days issued</th>
            <th>Created at</th>
            <th>Return date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="data.length">
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.book }}</td>
            <td>
              <span
                ><strong>{{ item.client_name }}</strong></span
              ><br />
              <span>{{ item.client_email }}</span>
            </td>
            <td>{{ item.days_issued }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>{{ formatDate(item.return_date) }}</td>
            <td>
              <button class="btn btn--danger" @click="deleteItem(item.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8">No data found</td>
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
        .get("/issue_book_returned")
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
        .delete("/issue-book/" + id)
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

