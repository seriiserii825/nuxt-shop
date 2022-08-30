export const state = () => ({
    server_url: "https://localhost:8088",
    isVisibleSidebar: true,
    isVisibleAddMedia: false,
    isVisibleNotify: false,
    notifyMessage: "",
});

export const mutations = {
    toggleSidebar(state) {
        state.isVisibleSidebar = !state.isVisibleSidebar;
    },
    showAdminMedia(state) {
        state.isVisibleAddMedia = true;
    },
    hideAdminMedia(state) {
        state.isVisibleAddMedia = false;
    },
    showNotify(state, payload) {
        state.isVisibleNotify = true;
        state.notifyMessage = payload.text;
    },
    hideNotify(state) {
        state.isVisibleNotify = false;
    }
};

export const actions = {
    toggleSidebar({commit}) {
        commit("toggleSidebar");
    },
    showAdminMedia({commit}) {
        commit("showAdminMedia");
    },
    hideAdminMedia({commit}) {
        commit("hideAdminMedia");
    },
};
