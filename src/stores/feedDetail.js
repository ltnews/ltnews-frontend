import api from '../api/api'

import {
  FEED_GET_ONE, FEED_GET_ITEMS, FEED_DELETE, FEED_GET_ITEMS_PAGE,
  FETCH_END_FEED, FETCH_END_FEED_ITEMS
} from './types'

function getInitialState () {
  return {
    feed: {},
    items: {
      count: 0,
      next: null,
      previous: null,
      results: []
    }
  }
}

export const state = getInitialState()

const getters = {
  feedDetailFeed: state => state.feed,
  feedDetailItems: state => state.items.results,
  feedDetailNext: state => state.items.next === null,
  feedDetailPrevious: state => state.items.previous === null
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
  [FEED_GET_ITEMS_PAGE] ({state, commit}, next) {
    let url = "";
    if (next) {
      url = state.items.next;
    } else {
      url = state.items.previous;
    }

    return api.generic_get(url)
      .then(({data}) => {
        commit(FETCH_END_FEED_ITEMS, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [FEED_DELETE] ({state}) {
    return api.feed_delete(state.feed.id)
  }
}

const mutations = {
  [FETCH_END_FEED] (state, feed) {
    state.feed = feed
  },
  [FETCH_END_FEED_ITEMS] (state, items) {
    state.items = items
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
