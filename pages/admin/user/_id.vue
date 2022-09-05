<template lang="pug">
  AdminForm(label="Edit user")
    .form__flex
      .form__item(:class="{ 'form__item--error': errors.name }")
        label.form__label(for="name") Title
        input(type="text", placeholder="Enter name...", v-model="name")
        p.text-error(v-if="errors && errors.name")
          | {{ errors.name[0] }}
      .form__item(:class="{ 'form__item--error': errors.email }")
        label.form__label(for="email") Email
        input(type="text", placeholder="Enter email...", v-model="email")
        p.text-error(v-if="errors && errors.email")
          | {{ errors.email[0] }}
    .form__flex
      .form__item(:class="{ 'form__item--error': errors.password }")
        label.form__label(for="password") Password
        input(type="text", placeholder="Enter password...", v-model="password")
        p.text-error(v-if="errors && errors.password")
          | {{ errors.password[0] }}
    button.btn(@click="onSubmit") Submit
</template>
<script>
import AdminForm from "@/admin/form/Form";

export default {
  layout: "admin",
  data() {
    return {
      id: "",
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.$axios
          .put("/auth/user/" + this.id, data)
          .then(() => {
            this.$router.push("/admin/user");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getData() {
      this.$axios
          .get("/auth/user/" + this.id)
          .then((res) => {
            const {
              name,
              email,
              password,
            } = res.data.data;
            this.name = name;
            this.email = email;
            this.password = password;
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
    this.id = this.$route.params.id;
    this.getData();
  },
};
</script>
