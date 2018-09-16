import Vue from 'vue'
import api from '../api/section'

import {SECTION_GET_ONE, SECTION_POST, SECTION_PUT, SECTION_RESET,
  FETCH_END, RESET_STATE
} from './types'

const initialState = {
  section: {
    id: 0,
    title: '',
    description: '',
    feeds: []
  }
}

export const state = Object.assign({}, initialState)

const getters = {
  sectionDetailSection: state => state.section
}

const actions = {
  [SECTION_GET_ONE] (context, id) {
    return api.section_get_one(id)
      .then(({ data }) => { context.commit(FETCH_END, data) })
      .catch((error) => { throw new Error(error) })
  },
  [SECTION_POST] ({ state }) {
    return api.sections_post(state.section)
  },
  [SECTION_PUT] ({ state }) {
    return api.section_put(state.section.id, state.section)
  },
  [SECTION_RESET] ({ commit }) {
    commit(RESET_STATE)
  }
}

const mutations = {
  [FETCH_END] (state, section) {
    state.section = section
  },
  [RESET_STATE] () {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
