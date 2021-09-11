export const state = () => {
  return {
    megaMenu: 'web'
  }
}

export const mutations = {
  setMegaMenu(state, payload) {
    state.megaMenu = payload;
  }
}

export const actions = {
  setMegaMenu({ commit }, payload) {
    commit('setMegaMenu', payload);
  }
}

export const getters = {
  megaMenu(state) {
    return state.megaMenu;
  }
}
