<template lang="pug">
  AdminForm(label='Create category')
    .form__flex
      .form__item
        label.form__label(for='user_id')  User
        select#status(name='user_id', v-model='status')
          option(:value='1') Active
          option(:value='0') Inactive
      .form__item(:class="{ 'form__item--error': errors.name }")
        label.form__label(for='name')  Name
        input(type='text', placeholder='Enter name...', v-model='name')
        p.text-error(v-if='errors && errors.name')
          | {{ errors.name[0] }}
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
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {name: this.name, status: this.status};

      this.$axios
          .put("/order/" + this.id, data)
          .then(() => {
            this.$router.push("/order");
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
            if (err.response.data && err.response.data.errors) {
              setErrors(err.response.data.errors);
            }
          });
    },
    getUsers() {
      // this.$axios
      //     .get("/auth/user")
      //     .then((res) => {
      //       this.users = res.data.data;
      //     })
      //     .catch((err) => {
      //       if (err.response.data && err.response.data.errors) {
      //         setErrors(err.response.data.errors);
      //       }
      //     });
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
