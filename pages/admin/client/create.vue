<template>
  <AdminForm label="Create client">
    <div class="form__flex">
      <div class="form__item" :class="{ 'form__item--error': errors.name }">
        <label class="form__label" htmlFor="name"> Name </label>
        <input type="text" placeholder="Enter name..." v-model="name" />
        <p v-if="errors && errors.name" class="text-error">
          {{ errors.name[0] }}
        </p>
      </div>
      <div class="form__item" :class="{ 'form__item--error': errors.email }">
        <label class="form__label" htmlFor="email"> Email </label>
        <input type="text" placeholder="Enter email..." v-model="email" />
        <p v-if="errors && errors.email" class="text-error">
          {{ errors.email[0] }}
        </p>
      </div>
    </div>
    <div class="form__flex">
      <div
        class="form__item"
        :class="{ 'form__item--error': errors.mobile_number }"
      >
        <label class="form__label" htmlFor="mobile_number"> Mobile number </label>
        <input
          type="text"
          placeholder="Enter mobile_number..."
          v-model="mobile_number"
        />
        <p v-if="errors && errors.mobile_number" class="text-error">
          {{ errors.mobile_number[0] }}
        </p>
      </div>
      <div class="form__item" :class="{ 'form__item--error': errors.gender }">
        <label class="form__label" htmlFor="gender"> Gender </label>
        <select name="gender" id="gender" v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
    <div class="form__flex">
      <div class="form__item" :class="{ 'form__item--error': errors.address }">
        <label class="form__label" htmlFor="address"> Address </label>
        <input type="text" placeholder="Enter address..." v-model="address" />
        <p v-if="errors && errors.address" class="text-error">
          {{ errors.address[0] }}
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
import AdminForm from "@/admin/form/Form";
export default {
  data() {
    return {
      name: "",
      email: "",
      mobile_number: "",
      gender: "male",
      address: "",
      status: 1,
      errors: {},
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = { 
        name: this.name, 
        email: this.email,
        mobile_number: this.mobile_number,
        gender: this.gender,
        address: this.address,
        status: this.status };

      this.$axios
        .post("/client", data)
        .then((res) => {
          this.$router.push("/client");
        })
        .catch((err) => {
          if (err.response.data && err.response.data.errors) {
            this.errors = err.response.data.errors;
          }
        });
    },
  },
  components: {
    AdminForm,
  },
};
</script>
