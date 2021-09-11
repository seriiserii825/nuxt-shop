export const state = () => {
  return {
    scrollBarWidth: null
  }
}

export const mutations = {
  setScrollBarWidth(state, payload){
    state.scrollBarWidth = payload
  }
}

export const actions = {
  setScrollBarWidth({commit}, payload) {
    commit('setScrollBarWidth', payload);
  }
}

export const getters = {
  scrollBarWidth(state){
    return state.scrollBarWidth;
  }
}
