function getQty(items) {
  return items.reduce((sum, current) => {
    return sum + current.qty;
  }, 0);
}

export const state = () => {
  return {
    media: [],
    cart: null
  };
};

export const mutations = {
  setMedia(state, media) {
    state.media = media;
  },
  setCart(state, payload) {
    state.cart = payload;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const media = await this.$axios.$get(process.env.baseUrl + "/api/v1/media");
    commit("setMedia", media);
  },
  createLocalStorage({ commit }, payload) {
    const storageData = JSON.parse(localStorage.getItem("shop_cart"));
    commit("setCart", storageData);
  },
  addProductsToLocalStorage({ commit }, payload) {
    const { id, qty, product } = payload;
    const cart = {
      userId: new Date().valueOf(),
      products: [],
      total: 0,
      qty: 0
    };
    if (!localStorage.getItem("shop_cart")) {
      cart.products.push(product);

      cart.total = cart.products.reduce((sum, current) => {
        return sum + current.price * current.qty;
      }, 0);

      cart.qty = cart.products.reduce((sum, current) => {
        return sum + current.qty;
      }, 0);

      localStorage.setItem("shop_cart", JSON.stringify(cart));

      commit("setCart", cart);
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem("shop_cart"));

      const qtyStorage = localStorageCart.qty;
      console.log(qtyStorage, "qtyStorage");

      const idx = localStorageCart.products.find(
        (product) => product.id === id
      );

      if (idx) {
        localStorageCart.products = localStorageCart.products.map((product) => {
          if (product.id === id) {
            product.qty = qty;
            return product;
          }
          return product;
        });
      } else {
        localStorageCart.products.push(product);
      }

      localStorageCart.total = localStorageCart.products.reduce(
        (sum, current) => {
          return sum + current.price * current.qty;
        },
        0
      );

      localStorageCart.qty = localStorageCart.products.reduce(
        (sum, current) => {
          return sum + current.qty;
        },
        0
      );

      localStorage.setItem("shop_cart", JSON.stringify(localStorageCart));
      commit("setCart", localStorageCart);
    }
  }
};

export const getters = {
  media(state) {
    return state.media;
  },
  cart(state) {
    return state.cart;
  }
};
