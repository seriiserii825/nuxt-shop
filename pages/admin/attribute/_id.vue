<template lang="pug">
  AdminForm(label="Edit attribute")
    .form__flex
      .form__item(:class="{ 'form__item--error': errors.title }")
        label.form__label(for="title") Title
        input(type="text", placeholder="Enter title...", v-model="title")
        p.text-error(v-if="errors && errors.title")
          | {{ errors.title[0] }}
    button.btn(@click="onSubmit") Submit
</template>
<script>
import AdminForm from "@/admin/form/Form";

export default {
  layout: "admin",
  data() {
    return {
      id: "",
      title: "",
      errors: {},
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {title: this.title};

      this.$axios
          .put("/auth/attribute/" + this.id, data)
          .then((res) => {
            this.$router.push("/admin/attribute");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getData() {
      this.$axios
          .get("/auth/attribute/" + this.id)
          .then((res) => {
            this.title = res.data.data.title;
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
  },
  components: {
    AdminForm,
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
  },
};
</script>
