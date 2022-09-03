<template lang="pug">
  AdminForm(label='Create order')
    .form__flex
      .form__item
        label.form__label(for='user_id')  User
        select#user_id(v-model='user_id')
          option(v-for="item in users" :key="item.id" :value="item.id") {{item.name}}
      .form__item(:class="{ 'form__item--error': errors.sum }")
        label.form__label(for='sum')  Sum
        input(type='text', placeholder='Enter name...', v-model='sum')
        p.text-error(v-if='errors && errors.sum')
          | {{ errors.sum[0] }}
    .form__flex
      .form__item
        label.form__label(for='status') Status
        select#status(v-model='status')
          option(value="0") New
          option(value="1") Completed
          option(value="2") Deleted
      .form__item
        label.form__label(for='note') Note
        textarea#note(v-model='note')
    .form__flex
      .form__item
        label.form__label Created at
        div {{created_at}}
      .form__item
        label.form__label Updated at
        div {{updated_at}}
    button.btn(@click='onSubmit') Submit
</template>
<script>
import AdminForm from "@/admin/form/Form";

export default {
  layout: "admin",
  data() {
    return {
      id: "",
      user_id: "",
      status: "0",
      note: "",
      sum: "",
      created_at: "",
      updated_at: "",
      errors: {},
      users: []
    };
  },
  methods: {
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
    onSubmit(e) {
      e.preventDefault();
      const data = {
        user_id: this.user_id,
        status: this.status,
        note: this.note,
        sum: this.sum,
      };

      this.$axios
          .put("/auth/order/" + this.id, data)
          .then(() => {
            this.$router.push("/admin/order");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getData() {
      this.$axios
          .get("/auth/order/" + this.id)
          .then((res) => {
            const {user_id, status, note, sum, created_at, updated_at} = res.data.data;
            this.user_id = user_id;
            this.status = status;
            this.note = note;
            this.sum = sum;
            this.created_at = created_at;
            this.updated_at = updated_at;
          })
          .catch((err) => {
            console.log(err, 'err')
            if (err.response.data && err.response.data.errors) {
              setErrors(err.response.data.errors);
            }
          });
    },
    getUsers() {
      this.$axios
          .get("/auth/user")
          .then((res) => {
            this.users = res.data.data;
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
    this.getUsers();
  },
};
</script>
