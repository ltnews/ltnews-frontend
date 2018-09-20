import Vue from 'vue'
import api from '../api/api'

import {
  FEED_GET_ONE, FEED_GET_ITEMS, FEED_RESET, FEED_DELETE,
  FETCH_END_FEED, FETCH_END_FEED_ITEMS, RESET_STATE_FEED
} from './types'

function getInitialState () {
  return {
    feed: {},
    items: []
  }
}

export const state = getInitialState()

const getters = {
  feedDetailFeed: state => state.feed,
  feedDetailItems: state => state.items
}

const actions = {
  [FEED_GET_ONE] (context, id) {
    return api.feed_get_one(id)
      .then(({data}) => {
        context.commit(FETCH_END_FEED, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FEED_GET_ITEMS] (context, id) {
    return api.feed_get_items(id)
      .then(({data}) => {
        context.commit(FETCH_END_FEED_ITEMS, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FEED_DELETE] ({state}) {
    return api.feed_delete(state.feed.id)
  },
  [FEED_RESET] ({commit}) {
    commit(RESET_STATE_FEED)
  }
}

const mutations = {
  [FETCH_END_FEED] (state, feed) {
    state.feed = feed
  },
  [FETCH_END_FEED_ITEMS] (state, items) {
    state.items = items
  },
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