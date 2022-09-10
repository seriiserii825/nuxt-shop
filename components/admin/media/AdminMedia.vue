<template>
  <div class="media">
    <div class="media__container">
      <header class="media__header">
        <input type="text" v-model="search" placeholder="Search..."/>
        <button class="btn btn--danger" @click="onClose">Close</button>
      </header>
      <div class="media__body">
        <div class="media__wrap">
          <MediaItem
              v-for="item in data"
              :key="item.id"
              :item="item"
              @on-choose="addImage"
          />
        </div>
      </div>
      <footer class="media__footer">
        <button class="btn btn--success" @click="addImages">Add images</button>
      </footer>
    </div>
  </div>
</template>
<script>
import MediaItem from "@/admin/media/MediaItem.vue";

export default {
  props: {
    is_gallery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      images: [],
      data: [],
      search: "",
    };
  },
  methods: {
    addImage(full_url, remove) {
      if (remove) {
        this.images = images.filter(
            (image_full_url) => image_full_url !== full_url
        );
      } else {
        if (!this.images.includes(full_url)) {
          this.images = [...this.images, full_url];
        }
      }
    },
    addImages() {
      if (this.is_gallery) {
        this.$emit("on-gallery", this.images);
        this.$emit("on-close");
      } else {
        this.$emit("on-images", this.images);
        this.$emit("on-close");
      }
    },
    onClose() {
      this.$emit("on-close");
    },
    getData() {
      this.$axios
          .get("/auth/media?search=" + this.search)
          .then((res) => {
            this.data = res.data.data.reverse();
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
  },
  components: {
    MediaItem,
  },
  created() {
    this.getData();
  },
};
</script>
