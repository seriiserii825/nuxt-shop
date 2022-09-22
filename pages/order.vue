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
              <img width="60" :src="`${server_url}${item.image}`" alt="">
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

      <div class="order-list" v-if="items && items.length > 0">
        <ul>
          <li class="order-list__item">
            <div class="order-list__title">Name</div>
            <input type="text" v-model="user.name" disabled>
          </li>
          <li class="order-list__item">
            <div class="order-list__title">Email</div>
            <input type="text" v-model="user.email" disabled>
          </li>
          <li class="order-list__item">
            <div class="order-list__title">Note:</div>
            <textarea v-model="note" class="order-list__item__value__textarea" placeholder="Note..."></textarea>
          </li>
        </ul>
        <button class="btn btn--success" @click="submitOrder">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      items: [],
      total: 0,
      user: {},
      note: '',
      sum: 0,
    }
  },
  methods: {
    submitOrder() {
      const data = {
        user_id: this.user.id,
        status: '0',
        note: this.note,
        sum: this.total,
        cart: JSON.stringify(this.items)
      };
      console.log(this.user_id, 'user_id');

      this.$axios
          .post("/create-order", data)
          .then((res) => {
            this.$store.dispatch('setCart', {items: [], total: 0, quantity: 0});
            this.$router.push('/');
          })
          .catch((err) => {
            if (err.response.data && err.response.data.errors) {
              this.errors = err.response.data.errors;
            }
          });
    },
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
    if (this.$auth && this.$auth.user) {
      this.getCart();
      this.user = this.$auth.user.user;
      console.log(this.user, 'this.user');
    } else {
      this.$router.push('/login');
    }
  }
}
</script>
<style lang="scss">
</style>
