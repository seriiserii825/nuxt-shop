<template>
  <div>
    <AdminForm label="Return Book">
      <div v-if="client_id" class="form__flex">
        <div class="form__item">
          <label class="form__label" htmlFor="client_id">Client</label>
          <select
            name="client_id"
            id="client_id"
            v-model="client_id"
            @change="clientChange"
          >
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }}
            </option>
          </select>
        </div>
        <div class="form__item">
          <label class="form__label" htmlFor="book_id">Book</label>
          <select name="book_id" id="book_id" v-model="book_id">
            <option v-for="book in books" :key="book.id" :value="book.id">
              {{ book.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="no-content" v-else>
        <h3>No Books....</h3>
      </div>
      <button class="btn" @click="onSubmit">Submit</button>
    </AdminForm>
  </div>
</template>
<script>
import AdminForm from "../../components/admin/form/Form";
export default {
  data() {
    return {
      issues: [],
      books: [],
      book_id: "",
      clients: [],
      client_id: "",
      errors: {},
    };
  },
  methods: {
    clientChange() {
      const client_issue = this.issues.filter(
        (issue) => issue.client_id == this.client_id
      );
      this.books = client_issue.map((issue) => {
        return {
          id: issue.book_id,
          name: issue.book,
        };
      });
      this.book_id = this.books[0].id;
    },
    onSubmit(e) {
      e.preventDefault();
      this.error_message = "";
      const selected_issue = this.issues.filter(
        (issue) =>
          issue.client_id == this.client_id && issue.book_id == this.book_id
      );
      const issue_id = selected_issue[0].id;
      const issue_date_timestamp = new Date().getTime();
      const date = new Date(issue_date_timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const date_str =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      const data = {
        is_returned: true,
        return_date: date_str,
      };

      this.$axios
        .put("/issue-book/" + issue_id, data)
        .then(() => {
          this.$router.push("/return-book");
        })
        .catch((err) => {
          if (err.response.data && err.response.data.message) {
            this.error_message = err.response.data.message;
          }
          if (err.response.data && err.response.data.errors) {
            this.errors = err.response.data.errors;
          }
        });
    },
    getIssue() {
      this.$axios
        .get("/issue-book")
        .then((response) => {
          this.issues = response.data.data;
          const issue_clients = this.issues.map((issue) => {
            return {
              id: issue.client_id,
              name: issue.client_name,
            };
          });
          const unique_clients = [];
          issue_clients.forEach((client) => {
            if (!unique_clients.some((c) => c.id === client.id)) {
              unique_clients.push(client);
            }
          });
          this.clients = unique_clients;
          this.client_id = this.clients[0].id;
          this.clientChange();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    AdminForm,
  },
  created() {
    this.getIssue();
  },
};
</script>
