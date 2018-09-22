import Vue from 'vue'
import api from '../api/api'

import {
  ITEM_GET_ONE, ITEM_GET_COMMENTS, COMMENT_POST, COMMENT_DELETE, ITEM_POST,
  FETCH_END_ITEM, FETCH_START_COMMENTS, FETCH_END_COMMENTS, RESET_STATE_ITEM, ADD_COMMENT, REMOVE_COMMENT, SET_ITEM
} from './types'

function getInitialState () {
  return {
    item: {},
    comments: [],
    loading: false,
    status: {
      like: false,
      save: false,
      web: false
    },
    comment: {
      description: ''
    }
  }
}

export const state = getInitialState()

const getters = {
  itemDetailItem: state => state.item,
  itemDetailStatus: state => state.status,
  itemDetailComments: state => state.comments,
  itemDetailComment: state => state.comment
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
  [ITEM_POST] ({ commit, state }, param) {
    commit(SET_ITEM, param)
    return api.item_post(state.item.id, state.status)
  },
  [ITEM_GET_COMMENTS] (context, id) {
    context.commit(FETCH_START_COMMENTS)
    return api.comment_get_all(id)
      .then(({ data }) => { context.commit(FETCH_END_COMMENTS, data) })
      .catch((error) => { throw new Error(error) })
  },
  [COMMENT_POST] ({commit, state}) {
    return api.comment_post(state.item.id, state.comment)
      .then(({ data }) => { commit(ADD_COMMENT, data) })
      .catch((error) => { throw new Error(error) })
  },
  [COMMENT_DELETE] (context, params) {
    let response = api.comment_delete(params[0])
    context.commit(REMOVE_COMMENT, params[1])
    return response
  }
}

const mutations = {
  [FETCH_END_ITEM] (state, item) {
    // TODO: update status
    state.item = item
  },
  [RESET_STATE_ITEM] () {
    let initialState = getInitialState()
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  },
  [SET_ITEM] (state, param) {
    Vue.set(state.status, param[0], param[1])
  },
  [FETCH_START_COMMENTS] (state) {
    state.loading = true
  },
  [FETCH_END_COMMENTS] (state, comments) {
    state.comments = comments
    state.loading = false
  },
  [ADD_COMMENT] (state, comment) {
    state.comments.push(comment)
    Vue.set(state, 'comment', getInitialState()['comment'])
  },
  [REMOVE_COMMENT] (state, index) {
    state.comments.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}