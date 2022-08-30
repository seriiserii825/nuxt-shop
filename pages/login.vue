<template lang="pug">
  .auth-form
    .auth-form__content
      .auth-form__title
        h1 Login
      .auth-form__form
        form
          .auth-form__form-group
            input#email(type="email" placeholder="Email" v-model="email")
            span.auth-form--error(v-if="errors.email && errors.email[0]") {{ errors.email[0] }}
          .auth-form__form-group
            input#password(type="password" placeholder="Password" v-model="password")
            span.auth-form--error(v-if="errors.password && errors.password[0]") {{ errors.password[0] }}
          div.auth-form__info You don't have an account yet? <nuxt-link to="/register">Register</nuxt-link>
          .auth-form__form-group
            button(type="submit" @click.prevent="onSubmit") Login
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      errors: [],
      email: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('/login', {
        email: this.email,
        password: this.password,
      }).then(response => {
        localStorage.setItem('token', response.data.access_token);
        this.$router.push('/');
      }).catch(error => {
        if (error.response.data && error.response.data.error) {
          this.$store.commit('showNotify', {
            text: error.response.data.error,
          });
          this.$router.push('/');
        }
        this.errors = error.response.data.errors;
      });
    },
  }
}
</script>
