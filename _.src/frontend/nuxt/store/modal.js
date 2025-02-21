export default {
    state: () => ({
        modals: []
    }),

    mutations: {
        setModals(state, value) {
            state.modals = value
        },

        addModal(state, modal) {
            state.modals.push(modal)
        },

        removeModal(state, modal) {
            state.modals.splice(state.modals.indexOf(modal), 1);
        }
    },

    actions: {
        open({ commit }, options) {
            commit('addModal', options);
            options.id = new Date().getTime();
            return new Promise(resolve => {
                options.$resolve = resolve;
            });
        },

        close({ commit, state }, { spec, result }) {
            const ref = state.modals.find(modal => modal.id === (spec.id || spec))
            if (ref) {
                commit("removeModal", ref)
                ref.$resolve(result);
            }
        }
    }
}