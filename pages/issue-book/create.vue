<template>
  <div>
    <div v-if="error_message" class="error-block">{{ error_message }}</div>
    <AdminForm label="Create issue">
      <div class="form__flex">
        <div class="form__item">
          <label class="form__label" htmlFor="category_id">Category</label>
          <select
            name="category_id"
            id="category_id"
            v-model="category_id"
            @change="categoryChange"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
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
      <div class="form__flex">
        <div class="form__item">
          <label class="form__label" htmlFor="client_id">Client</label>
          <select name="client_id" id="client_id" v-model="client_id">
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
          <label class="form__label" htmlFor="days_issued">Days issued</label>
          <select name="days_issued" id="days_issued" v-model="days_issued">
            <option
              v-for="item in days_issued_options"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
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
      error_message: "",
      categories: [],
      category_id: "",
      books: [],
      book_id: "",
      clients: [],
      client_id: "",
      days_issued_options: [
        {
          value: "7",
          label: "7 days",
        },
        {
          value: "14",
          label: "14 days",
        },
        {
          value: "21",
          label: "21 days",
        },
        {
          value: "28",
          label: "28 days",
        },
      ],
      days_issued: "",
      errors: {},
    };
  },
  methods: {
    categoryChange() {
      this.getBooks();
    },
    onSubmit(e) {
      e.preventDefault();
      this.error_message = "";
      const data = {
        category_id: this.category_id,
        book_id: this.book_id,
        client_id: this.client_id,
        days_issued: this.days_issued,
        is_returned: false,
      };

      this.$axios
        .post("/issue-book", data)
        .then(() => {
          this.$router.push("/issue-book");
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
    getCategories() {
      this.$axios
        .get("/category_by_status")
        .then((res) => {
          this.categories = res.data.data;
          this.category_id = this.categories[0].id;
          this.getBooks();
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    },
    getBooks() {
      this.$axios
        .get("/book_by_category?category_id=" + this.category_id)
        .then((res) => {
          this.books = res.data.data;
          this.book_id = this.books[0].id;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    getClients() {
      this.$axios
        .get("/client_by_status")
        .then((res) => {
          this.clients = res.data.data;
          this.client_id = this.clients[0].id;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
  },
  components: {
    AdminForm,
  },
  created() {
    this.getCategories();
    this.getClients();
    this.days_issued = this.days_issued_options[0].value;
  },
};
</script>
