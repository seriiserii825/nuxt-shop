<template>
  <div class="page-cabinet">
    <div class="container">
      <h2 class="title">My account</h2>
      <ul class="cabinet-list">
        <li>
          <h3 class="cabinet-list__title">Name</h3>
          <span class="cabinet-list__value">{{ user.name }}</span>
        </li>
        <li>
          <h3 class="cabinet-list__title">Email</h3>
          <span class="cabinet-list__value">{{ user.email }}</span>
        </li>
      </ul>
      <template v-if="orders && orders.length > 0">
        <div class="orders-table" v-for="order in orders" :key="order.id">
          <h3>Order: <span>{{ formatDate(order.created_at) }}</span></h3>

          <table class="order-table" v-if="order.items.length > 0">
            <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <template>
              <tr v-for="item in order.items">
                <td>
                  <img width="60" :src="`${server_url}/uploads/${item.image}`" alt="">
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.quantity }}</td>
                <td><strong>{{ item.price }} $</strong></td>
              </tr>
              <tr>
                <td colspan="3" class="order-table__total">Total:</td>
                <td class="order-table__total"><strong>{{ totalSum(order.items) }} $</strong></td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      orders: [],
      user: {}
    }
  },
  methods: {
    getOrders(id) {
      this.$axios
          .get(`/get-order/${id}`)
          .then((response) => {
            this.orders = response.data.data;
            this.orders = this.orders.map((item) => {
              item.items = JSON.parse(item.cart);
              return item;
            });
            console.log(this.orders, 'this.orders');
          })
          .catch((error) => {
            console.log(error.response, 'error.response');
          });
    },
    formatDate(date) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      return new Intl.DateTimeFormat("en", options).format(new Date(date));
    },
    totalSum(items){
      let sum = 0;
      items.forEach(item => {
        sum += item.price * item.quantity;
      });
      return sum;
    }
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    },
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
