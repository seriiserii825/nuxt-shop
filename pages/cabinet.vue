<template>
  <div class="page-cabinet">
    <div class="container">
      <h2 class="title">My account</h2>
      <ul class="cabinet-list">
        <li>
          <h3 class="cabinet-list__title">Name</h3>
          <span class="cabinet-list__value"></span>
        </li>
        <li>
          <h3 class="cabinet-list__title">Email</h3>
          <span class="cabinet-list__value"></span>
        </li>
      </ul>
      <div class="orders-table">
        <h3>Order: <span></span></h3>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    getOrders(id) {
      this.$axios
          .get(`/get-order/${id}`)
          .then((response) => {
            this.orders = response.data.data;
            console.log(this.orders, 'this.orders');
          })
          .catch((error) => {
            console.log(error.response, 'error.response');
          });
    }
  },
  created() {
    if (this.$auth && this.$auth.user) {
      this.user = this.$auth.user.user;
      if (this.user && this.user.id) {
        this.getOrders(this.user.id);
      }
    } else {
      this.$router.push('/login');
    }
  }
}
</script>
<style lang="scss">
</style>
