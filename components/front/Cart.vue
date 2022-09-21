<template>
  <div class="cart" :class="{'active': show_cart}">
    <div class="cart__body">
      <header class="cart__header">
        <h2 class="cart__title">Shopping Cart</h2>
        <div @click="closeCart" class="cart__close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path style="stroke:none;fill-rule:nonzero;fill-opacity:1"
                  d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10ZM6.836 6.836a.934.934 0 0 1 1.324 0l1.836 1.836 1.836-1.836a.937.937 0 0 1 1.324 1.324L11.32 9.996l1.836 1.836a.937.937 0 0 1-1.324 1.324L9.996 11.32 8.16 13.156a.937.937 0 0 1-1.324-1.324l1.836-1.836L6.836 8.16a.934.934 0 0 1 0-1.324Zm0 0"/>
          </svg>
        </div>
      </header>
      <table>
        <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path style="stroke:none;fill-rule:nonzero;fill-opacity:1"
                    d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10ZM6.836 6.836a.934.934 0 0 1 1.324 0l1.836 1.836 1.836-1.836a.937.937 0 0 1 1.324 1.324L11.32 9.996l1.836 1.836a.937.937 0 0 1-1.324 1.324L9.996 11.32 8.16 13.156a.937.937 0 0 1-1.324-1.324l1.836-1.836L6.836 8.16a.934.934 0 0 1 0-1.324Zm0 0"/>
            </svg>
          </th>
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
            <th>
              <svg @click="deleteItem(item.id)" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path style="stroke:none;fill-rule:nonzero;fill-opacity:1"
                      d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10ZM6.836 6.836a.934.934 0 0 1 1.324 0l1.836 1.836 1.836-1.836a.937.937 0 0 1 1.324 1.324L11.32 9.996l1.836 1.836a.937.937 0 0 1-1.324 1.324L9.996 11.32 8.16 13.156a.937.937 0 0 1-1.324-1.324l1.836-1.836L6.836 8.16a.934.934 0 0 1 0-1.324Zm0 0"/>
              </svg>
            </th>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="5">No items in cart</td>
          </tr>
        </template>
        </tbody>
      </table>
      <footer class="cart__footer">
        <div class="cart__total">
          <strong>Total:</strong>
          <strong>{{ total }}$</strong>
        </div>
        <div class="cart__actions" v-if="total && total > 0">
          <button @click="goToOrder" class="btn btn--success">Order</button>
          <button class="btn btn--danger" @click="clearCart">Clear Cart</button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      show_cart: false
    }
  },
  methods: {
    goToOrder() {
      this.closeCart();
      this.$router.push('/order');
    },
    clearCart() {
      this.$store.dispatch('setCart', {items: [], total: 0, quantity: 0});
      this.getCart();
    },
    closeCart() {
      this.$store.dispatch('toggleCart', false);
    },
    getCart() {
      this.items = this.$store.state.cart.items;
    },
    deleteItem(id) {
      const items = this.items.filter(item => item.id !== id);
      this.$store.dispatch('setCart', {items: items});
      this.getCart();
    }
  },
  computed: {
    server_url() {
      return this.$store.state.server_url
    },
    total() {
      return this.$store.state.cart.total;
    }
  },
  created() {
    this.getCart();
    setTimeout(() => {
      this.show_cart = true;
    }, 400);
  }
}
</script>
<style lang="scss">
</style>
