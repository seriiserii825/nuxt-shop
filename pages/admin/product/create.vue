<template lang="pug">
  AdminForm(label="Edit category")
    .form__flex
      .form__item(:class="{ 'form__item--error': errors.title }")
        label.form__label(for="title") Title
        input(type="text", placeholder="Enter title...", v-model="title")
        p.text-error(v-if="errors && errors.title")
          | {{ errors.title[0] }}
      .form__item
        label.form__label(for="category_id") Category
        select#category_id(name="category_id", v-model="category_id")
          option(v-for="item in categories", :key="item.id", :value="item.id") {{ item.title }}
        p.text-error(v-if="errors && errors.category_id")
          | {{ errors.category_id[0] }}

    .form__item(:class="{ 'form__item--error': errors.content }")
      label.form__label(for="content") Content
      client-only
        mavon-editor(v-model="content", language="en")
      p.text-error(v-if="errors && errors.content")
        | {{ errors.content[0] }}

    .form__flex
      .form__item(:class="{ 'form__item--error': errors.description }")
        label.form__label(for="description") Description
        textarea(v-model="description")
        p.text-error(v-if="errors && errors.description")
          | {{ errors.description[0] }}
      .form__item
        label.form__label(htmlfor="status") Status
        select#status(name="status", v-model="status")
          option(:value="1") Active
          option(:value="0") Inactive

    .form__flex
      .form__item(:class="{ 'form__item--error': errors.price }")
        label.form__label(for="price") Price
        input(type="text", v-model="price")
        p.text-error(v-if="errors && errors.price")
          | {{ errors.price[0] }}
      .form__item(:class="{ 'form__item--error': errors.old_price }")
        label.form__label(for="old_price") Old price
        input(type="text", v-model="old_price")
        p.text-error(v-if="errors && errors.old_price")
          | {{ errors.old_price[0] }}

    .form__flex
      .form__item(:class="{ 'form__item--error': errors.hit }")
        label.form__label(for="hit")
          input#hit(type="checkbox", v-model="hit", value="0")
          | Hit
        p.text-error(v-if="errors && errors.hit")
          | {{ errors.hit[0] }}
      .form__item
        label.form__label(htmlfor="img") Cover image
        button.btn.btn--success(@click="coverImageHandler")
          | Add image
        p.form__url(v-if="img") {{ img }}
        p.text-error(v-if="errors.img")
          | {{ errors.img[0] }}

    .form__item
      label.form__label Related products
      AutoComplete(@on-select="searchHandler" url="/auth/product-search?search=")

    AdminMedia(
      v-if="showMedia",
      @on-close="closeMedia",
      @on-images="setMediaImages"
    )

    button.btn.form__submit(@click="onSubmit") Submit
</template>
<script>
import AdminMedia from "@/admin/media/AdminMedia.vue";
import AdminForm from "@/admin/form/Form";
import AutoComplete from "@/admin/utils/AutoComplete";

export default {
  layout: "admin",
  data() {
    return {
      search: "",
      title: "",
      category_id: "",
      brand_id: 1,
      content: "",
      price: 0,
      old_price: 0,
      status: 1,
      description: "",
      img: "",
      hit: "0",
      relations: [],
      errors: {},
      categories: [],
      showMedia: false,
      images: []
    };
  },
  methods: {
    searchHandler(relations) {
      this.relations = relations.map(item => item.id);
      console.log(this.relations, 'this.relations');
    },
    onSubmit(e) {
      e.preventDefault();
      const data = {
        title: this.title,
        category_id: this.category_id,
        brand_id: this.brand_id,
        content: this.content,
        price: this.price,
        old_price: this.old_price,
        status: this.status,
        description: this.description,
        img: this.img,
        hit: this.hit,
        related: this.relations
      };

      this.$axios
          .post("/auth/product", data)
          .then((res) => {
            /* this.$router.push("/category"); */
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
    getCategories() {
      this.$axios.get("/auth/category").then((res) => {
        this.categories = res.data.data;
        this.categories = this.categories.filter((item) => {
          return item.parent_id !== 0;
        });
        console.log(this.categories, "this.categories");
      });
    },
    closeMedia() {
      document.body.style.overflow = "initial";
      this.showMedia = false;
    },
    setMediaImages(images) {
      this.media_images = images;
      this.img = images[0];
    },
    coverImageHandler() {
      document.body.style.overflow = "hidden";
      this.showMedia = true;
    },
  },
  components: {
    AutoComplete,
    AdminForm,
    AdminMedia,
  },
  created() {
    this.getCategories();
  },
};
</script>
