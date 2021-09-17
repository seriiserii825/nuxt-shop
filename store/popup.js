export const state = () => {
  return {
    popup: false,
    headerPopup: false
  };
};

export const mutations = {
  setPopup(state, payload) {
    state.popup = payload;
  },
  setHeaderPopup(state, payload) {
    state.headerPopup = payload;
  }
};

export const actions = {
  setPopup({ commit }, payload) {
    commit("setPopup", payload);
  },
  setHeaderPopup({ commit }, payload) {
    commit("setHeaderPopup", payload);
  }
};

export const getters = {
  popup(state) {
    return state.popup;
  },
  headerPopup(state) {
    return state.headerPopup;
  }
};
