export const state = () => {
  return {
    tipo: []
  };
};

export const mutations = {
  setTipo(store, tipo) {
    store.tipo = tipo;
  }
};

export const actions = {
  async fetchTipo({ commit }) {
    const tipoLocal = await this.$axios.$get(
      process.env.baseUrl + "/api/v1/tipo/"
    );
    commit("setTipo", tipoLocal.tipos);
  }
};

export const getters = {
  getTipo(state) {
    return state.tipo;
  }
};
