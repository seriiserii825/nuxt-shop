<template>
  <AdminForm label="Edit book">
    <div class="form__flex">
      <div class="form__item" :class="{ 'form__item--error': errors.name }">
        <label class="form__label" htmlFor="name"> Name </label>
        <input type="text" placeholder="Enter name..." v-model="name" />
        <p v-if="errors && errors.name" class="text-error">
          {{ errors.name[0] }}
        </p>
      </div>
      <div class="form__item">
        <label class="form__label" htmlFor="category_id">Category</label>
        <select name="category_id" id="category_id" v-model="category_id">
          <option v-for="item in categories" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form__flex">
      <div
        class="form__item"
        :class="{ 'form__item--error': errors.description }"
      >
        <label class="form__label" htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="description"
        ></textarea>
        <p v-if="errors && errors.description" class="text-error">
          {{ errors.description[0] }}
        </p>
      </div>
      <div class="form__item" :class="{ 'form__item--error': errors.amount }">
        <label class="form__label" htmlFor="amount">Amount</label>
        <input type="text" placeholder="Enter amount..." v-model="amount" />
        <p v-if="errors && errors.amount" class="text-error">
          {{ errors.amount[0] }}
        </p>
      </div>
    </div>
    <div class="form__flex">
      <div class="form__item" :class="{ 'form__item--error': errors.name }">
        <label class="form__label" htmlFor="name">Author</label>
        <input type="text" v-model="author" />
        <p v-if="errors && errors.author" class="text-error">
          {{ errors.author[0] }}
        </p>
      </div>
      <div class="form__item">
        <label class="form__label" htmlFor="select">Status</label>
        <select name="status" id="status" v-model="status">
          <option :value="0">Active</option>
          <option :value="1">Inactive</option>
        </select>
      </div>
    </div>
    <div class="form__flex">
      <div class="form__item">
        <label class="form__label" htmlFor="cover_image">Cover image</label>
        <button class="btn btn--success" @click="coverImageHandler">
          Add image
        </button>
        <p v-if="cover_image" class="form__url">{{ cover_image }}</p>
        <p v-if="errors.cover_image" class="text-error">
          {{ errors.cover_image[0] }}
        </p>
      </div>
    </div>
    <button class="btn" @click="onSubmit">Submit</button>

    <AdminMedia
      v-if="showMedia"
      @on-close="closeMedia"
      @on-images="setMediaImages"
    />
  </AdminForm>
</template>
<script>
import AdminMedia from "@/admin/media/Media.vue";
import AdminForm from "@/admin/form/Form";
export default {
  data() {
    return {
      name: "",
      categories: [],
      category_id: "",
      description: "",
      amount: "",
      cover_image: "",
      media_images: [],
      author: "",
      status: 1,
      errors: {},
      showMedia: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const data = {
        name: this.name,
        category_id: this.category_id,
        description: this.description,
        amount: this.amount,
        cover_image: this.cover_image,
        author: this.author,
        status: this.status,
      };

      this.$axios
        .put("/book/"+ this.$route.params.id, data)
        .then(() => {
          this.$router.push("/book");
        })
        .catch((err) => {
          if (err.response.data && err.response.data.errors) {
            this.errors = err.response.data.errors;
          }
        });
    },
    coverImageHandler() {
      document.body.style.overflow = "hidden";
      this.showMedia = true;
    },
    closeMedia() {
      document.body.style.overflow = "initial";
      this.showMedia = false;
    },
    setMediaImages(images) {
      this.media_images = images;
      this.cover_image = images[0];
    },
    getData() {
      this.$axios.get("/book/" + this.$route.params.id).then((res) => {
        this.name = res.data.data.name;
        this.category_id = res.data.data.category_id;
        this.description = res.data.data.description;
        this.amount = res.data.data.amount;
        this.cover_image = res.data.data.cover_image;
        this.author = res.data.data.author;
        this.status = res.data.data.status;
      });
    },
    setCategories() {
      this.$axios
        .get("/book_create")
        .then((res) => {
          this.categories = res.data.categories;
          this.category_id = this.categories[0].id;
        })
        .catch((err) => {
          console.log(err, "er");
        });
    },
  },
  components: {
    AdminForm,
    AdminMedia,
  },
  created() {
    this.setCategories();
    this.getData();
  },
};
</script>

