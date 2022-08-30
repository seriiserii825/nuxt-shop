<template>
  <div class="add-media">
    <div class="add-media__body">
      <div class="form__flex">
        <div class="form__image">
          <div class="form__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
              <path
                :style="{
                  stroke: 'none',
                  fill: '#000',
                  fillOpacity: 1,
                }"
                d="M10.293 17.832a3.123 3.123 0 0 0 4.418
              0l7.164-7.16v23.703a3.124 3.124 0 1 0 6.25 0V10.672l7.164
              7.168a3.13 3.13 0 0 0 4.422 0 3.126 3.126 0 0 0
              0-4.418L27.21.922A3.093 3.093 0 0 0 25 0c-.8
              0-1.602.305-2.207.914l-12.5 12.504a3.114 3.114 0 0 0 0
              4.414Zm36.582 16.543H31.25a6.248 6.248 0 0 1-6.25 6.25 6.248 6.248
              0 0 1-6.25-6.25H3.125A3.124 3.124 0 0 0 0 37.5v9.375A3.124 3.124 0
              0 0 3.125 50h43.75A3.124 3.124 0 0 0 50 46.875V37.5a3.124 3.124 0
              0 0-3.125-3.125Zm-4.688 10.156a2.35 2.35 0 0 1-2.343-2.343 2.35
              2.35 0 0 1 2.343-2.344 2.35 2.35 0 0 1 2.344 2.343 2.35 2.35 0 0
              1-2.343 2.344Zm0 0"
              />
            </svg>
          </div>
          <input
            @change="filesHandler"
            type="file"
            placeholder="Enter image..."
            ref="imageRef"
            multiple
          />
          <ul class="form__list">
            <li v-for="image_url in images_url" :key="image_url">
              {{ image_url }}
            </li>
          </ul>
        </div>
        <button class="btn" @click.prevent="onSubmit">Submit</button>
        <button class="btn btn--danger" @click="hideAdminMedia">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      images: [],
      images_url: [],
    };
  },
  methods: {
    filesHandler() {
      this.files = Array.from(this.$refs.imageRef.files);
      this.images = this.files.map((file) => {
        return file.name;
      });
      this.images_url = this.images;
    },
    onSubmit() {
      let formData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`files[${i}]`, this.files[i]);
      }

      axios
        .post("/media", formData)
        .then((res) => {
          this.setIsVisibleAdminMedia(false);
        })
        .catch((error) => {
          console.log(error.response, "error.response");
        });
    },
    hideAdminMedia() {
      this.$store.dispatch("hideAdminMedia");
    },
  },
};
</script>
<style lang="scss"></style>
