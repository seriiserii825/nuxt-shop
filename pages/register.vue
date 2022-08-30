<template lang="pug">
  .auth-form
    .auth-form__content
      .auth-form__title
        h1 Register
      .auth-form__form
        form
          .auth-form__form-group
            input#name(type="name" placeholder="Name" v-model="name")
            span.auth-form--error(v-if="errors.name && errors.name[0]") {{ errors.name[0] }}
          .auth-form__form-group
            input#email(type="email" placeholder="Email" v-model="email")
            span.auth-form--error(v-if="errors.email && errors.email[0]") {{ errors.email[0] }}
          .auth-form__form-group
            input#password(type="password" placeholder="Password" v-model="password")
            span.auth-form--error(v-if="errors.password && errors.password[0]") {{ errors.password[0] }}
          div.auth-form__info Do you have an account yet? <nuxt-link to="/login">Login</nuxt-link>
          .auth-form__form-group
            button(type="submit" @click.prevent="onSubmit") Register
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      }).then(response => {
        this.$router.push('/login');
      }).catch(error => {
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
      });
    },
  }
}
</script>
