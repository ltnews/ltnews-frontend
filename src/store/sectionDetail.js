import api from '../api/section'

import {
  SECTION_GET_ONE,
  FETCH_END
} from './types'

const state = {
  section: {
    title: '',
    description: '',
    feeds: []
  }
}

const getters = {
  sectionDetailSection: state => state.section
}

const actions = {
  [SECTION_GET_ONE] (context, id) {
    return api.section_get_one(id)
      .then(({ data }) => { context.commit(FETCH_END, data) })
      .catch((error) => { throw new Error(error) })
  }
}

const mutations = {
  [FETCH_END] (state, section) {
    console.log(section)
    state.section = section
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
