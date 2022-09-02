<template>
  <Form label="List Media">
    <media-table />
  </Form>
</template>
<script>
import MediaTable from "@/admin/media/MediaTable.vue";
export default {
  layout: 'admin',
  components: { MediaTable },
};
</script>
<style lang="scss"></style>
