<template lang="pug">
  AdminForm(label="Edit category")
    .form__flex
      .form__item(:class="{ 'form__item--error': errors.title }")
        label.form__label(for="title") Title
        input(type="text", placeholder="Enter title...", v-model="title")
        p.text-error(v-if="errors && errors.title")
          | {{ errors.title[0] }}
      .form__item
        label.form__label(for="parent_id") Categories
        select#parent_id(name="parent_id" v-model="parent_id")
          option(value="0") No parent
          option(v-for="item in categories" :key="item.id" :value="item.id") {{ item.title }}
    button.btn(@click="onSubmit") Submit
</template>
<script>
import AdminForm from "@/admin/form/Form";

export default {
  layout: "admin",
  data() {
    return {
      title: "",
      parent_id: 0,
      categories: [],
      errors: {},
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {title: this.title, status: this.status, parent_id: this.parent_id};

      this.$axios
          .post("/auth/category", data)
          .then(() => {
            this.$router.push("/admin/category");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getCategories() {
      this.$axios
          .get("/auth/category")
          .then((res) => {
            const categories = res.data.data;
            this.categories = categories.filter((item) => {
              return item.parent_id === 0;
            });
            console.log(this.categories, "this.categories");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              setErrors(err.response.data.errors);
            }
          });
    },
  },
  components: {
    AdminForm,
  },
  created() {
    this.getCategories();
  },
};
</script>
