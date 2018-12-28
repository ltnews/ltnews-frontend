import Vue from 'vue'
import api from '../api/api'

import {
  FEED_POST, FEED_RESET,
  RESET_STATE_FEED
} from './types'

function getInitialState () {
  return {
    feedForm: {
      url: '',
      section: ''
    }
  }
}

export const state = getInitialState()

const getters = {
  feedForm: state => state.feedForm
}

const actions = {
  [FEED_POST] ({state}) {
    return api.feed_post(state.feedForm)
  },
  [FEED_RESET] ({commit}) {
    commit(RESET_STATE_FEED)
  }
}

const mutations = {
  [RESET_STATE_FEED] () {
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
