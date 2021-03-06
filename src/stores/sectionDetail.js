import Vue from 'vue'
import api from '../api/api'

import {
  SECTION_GET_ONE, SECTION_POST, SECTION_PUT, SECTION_RESET, SECTION_DELETE,
  FETCH_END_SECTION, RESET_STATE_SECTION
} from './types'

function getInitialState () {
  return {
    section: {
      id: 0,
      title: '',
      description: '',
      feeds: []
    }
  }
}

export const state = getInitialState()

const getters = {
  sectionDetailSection: state => state.section
}

const actions = {
  [SECTION_GET_ONE] (context, id) {
    return api.section_get_one(id)
      .then(({data}) => {
        context.commit(FETCH_END_SECTION, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [SECTION_POST] ({state}) {
    return api.sections_post(state.section)
  },
  [SECTION_PUT] ({state}) {
    return api.section_put(state.section.id, state.section)
  },
  [SECTION_DELETE] ({state}) {
    return api.section_delete(state.section.id)
  },
  [SECTION_RESET] ({commit}) {
    commit(RESET_STATE_SECTION)
  }
}

const mutations = {
  [FETCH_END_SECTION] (state, section) {
    state.section = section
  },
  [RESET_STATE_SECTION] () {
    let initialState = getInitialState()
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
