import { TYPES } from '@/api';

const typeNames = Object.values(TYPES);

const defaultState = {
  resources: [],
  selectedTypes: typeNames,
};

const getters = {
  resources: state => state.resources,
  selectedTypes: state => state.selectedTypes,
};

const mutations = {
  SET_RESOURCES(state, resources) {
    state.resources = resources;
  },
  SET_SELECTED_TYPES(state, types) {
    state.selectedTypes = types;
  },
};

const actions = {
  setResources({ commit }, resources = []) {
    commit('SET_RESOURCES', resources);
  },
  setSelectedTypes({ commit }, types = []) {
    commit('SET_SELECTED_TYPES', types);
  },
};

export default {
  state: defaultState,
  getters,
  mutations,
  actions,
};
