<template>
  <div class="page-order">
    <div class="container">
      <h2 class="title">Order</h2>
      <table class="order-table" v-if="items.length > 0">
        <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="items && items.length > 0">
          <tr v-for="item in items">
            <td>
              <img width="60" :src="`${server_url}/uploads/${item.image}`" alt="">
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td><strong>{{ item.price }}$</strong></td>
          </tr>
          <tr>
            <td colspan="3" class="order-table__total">Total:</td>
            <td class="order-table__total"><strong>{{ total }}$</strong></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5">No items in cart</td>
          </tr>
        </template>
        </tbody>
      </table>
      <h3 v-else>No items...</h3>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      items: [],
      total: 0
    }
  },
  methods: {
    getCart() {
      this.items = this.$store.state.cart.items;
      this.total = this.$store.state.cart.total;
    },
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    }
  },
  created() {
    this.getCart();
  }
}
</script>
<style lang="scss">
</style>
