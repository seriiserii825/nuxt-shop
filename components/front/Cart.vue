<template>
  <div class="cart">
    <div class="cart__body">
      <header class="cart__header">
        <h2 class="cart__title">Shopping Cart</h2>
        <div class="cart__close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
          </svg>
        </div>
      </header>
      <footer class="cart__footer">
        <div class="cart__actions">
          <button class="cart__action" @click="clearCart">
            <svg class="cart__action-icon" width="16" height="16">
              <use xlink:href="#icon-trash"></use>
            </svg>
            <span class="cart__action-text">Clear cart</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clearCart() {

    }
  }
}
</script>
<style lang="scss">
</style>
