import api from '../api/section'

import {
  SECTION_GET_ALL,
  FETCH_START,
  FETCH_END
} from './types'

const state = {
  loading: true,
  sections: [],
  sectionsCount: 0
}

const getters = {
  sectionListLoading: state => state.loading,
  sectionListSections: state => state.sections,
  sectionListSectionsCount: state => state.sectionsCount
}

const actions = {
  [SECTION_GET_ALL] ({ commit }) {
    commit(FETCH_START)
    return api.section_get_all()
      .then(({ data }) => { commit(FETCH_END, data) })
      .catch((error) => { throw new Error(error) })
  }
}

const mutations = {
  [FETCH_START] (state) {
    state.loading = true
  },
  [FETCH_END] (state, sections) {
    state.sections = sections
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
