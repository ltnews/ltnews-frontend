import Vue from 'vue'
import api from '../api/api'

import {
  ITEM_GET_ONE, ITEM_GET_COMMENTS,
  FETCH_END_ITEM, FETCH_START_COMMENTS, FETCH_END_COMMENTS, RESET_STATE_ITEM
} from './types'

function getInitialState () {
  return {
    item: {},
    comments: [],
    loading: false
  }
}

export const state = getInitialState()

const getters = {
  itemDetailItem: state => state.item,
  itemDetailComments: state => state.comments
}

const actions = {
  [ITEM_GET_ONE] (context, id) {
    context.commit(RESET_STATE_ITEM)
    return api.item_get_one(id)
      .then(({data}) => {
        context.commit(FETCH_END_ITEM, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [ITEM_GET_COMMENTS] (context, id) {
    context.commit(FETCH_START_COMMENTS)
    return api.comment_get_all(id)
      .then(({ data }) => { context.commit(FETCH_END_COMMENTS, data) })
      .catch((error) => { throw new Error(error) })
  }
}

const mutations = {
  [FETCH_END_ITEM] (state, item) {
    state.item = item
  },
  [RESET_STATE_ITEM] () {
    let initialState = getInitialState()
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  },
  [FETCH_START_COMMENTS] (state) {
    state.loading = true
  },
  [FETCH_END_COMMENTS] (state, comments) {
    state.comments = comments
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
