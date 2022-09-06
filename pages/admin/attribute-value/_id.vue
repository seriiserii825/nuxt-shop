<template lang="pug">
  AdminForm(label="Create attribute")
    .form__flex
      .form__item
        label.form__label(for="attr_group_id") Attributes
        select#attr_group_id(v-model="attr_group_id")
          option(v-for="item in attributes" :key="item.id" :value="item.id") {{ item.title }}
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
      attr_group_id: "",
      errors: {},
      attributes: []
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {title: this.title, attr_group_id: this.attr_group_id};
      this.$axios
          .put("/auth/attribute-value/" + this.id, data)
          .then((res) => {
            this.$router.push("/admin/attribute-value");
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getAttributes() {
      this.$axios
          .get("/auth/attribute")
          .then((res) => {
            this.attributes = res.data.data.reverse();
            this.attr_group_id = this.attributes[0].id;
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
    getData() {
      this.$axios
          .get(`/auth/attribute-value/${this.id}`)
          .then((res) => {
            console.log(res.data.data, 'res.data.data')
            this.title = res.data.data.title;
            this.attr_group_id = res.data.data.attr_group_id;
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    }
  },
  components: {
    AdminForm,
  },
  created() {
    this.id = this.$route.params.id;
    this.getAttributes();
    this.getData();
  },
};
</script>
