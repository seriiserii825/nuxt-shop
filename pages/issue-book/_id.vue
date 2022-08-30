<template>
  <AdminForm label="Create category">
    <div class="form__flex">
      <div class="form__item" :class="{ 'form__item--error': errors.name }">
        <label class="form__label" htmlFor="name"> Name </label>
        <input type="text" placeholder="Enter name..." v-model="name" />
        <p v-if="errors && errors.name" class="text-error">
          {{ errors.name[0] }}
        </p>
      </div>
      <div class="form__item">
        <label class="form__label" htmlFor="status"> Status </label>
        <select name="status" id="status" v-model="status">
          <option :value="1">Active</option>
          <option :value="0">Inactive</option>
        </select>
      </div>
    </div>
    <button class="btn" @click="onSubmit">Submit</button>
  </AdminForm>
</template>
<script>
import AdminForm from "../../components/admin/form/Form";
export default {
  data() {
    return {
      id: "",
      name: "",
      status: 1,
      errors: {},
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = { name: this.name, status: this.status };

      this.$axios
        .put("/category/" + this.id, data)
        .then(() => {
          this.$router.push("/category");
        })
        .catch((err) => {
          if (err.response.data && err.response.data.errors) {
            this.errors = err.response.data.errors;
          }
        });
    },
    getData() {
      this.$axios
        .get("/category/" + this.id)
        .then((res) => {
          const { name, status } = res.data.data;
          this.name = name;
          this.status = status;
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
