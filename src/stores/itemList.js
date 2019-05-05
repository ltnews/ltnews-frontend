import api from '../api/api'

import {
    ITEM_GET_ALL, ITEM_GET_SAVED, ITEM_RECOMMEND, ITEM_GET_ITEMS_PAGE, ITEM_SEARCH, ITEM_LIST_RESET,
    FETCH_START_ITEMS, FETCH_END_ITEMS
} from './types'

const RESET_STATE_ITEM_LIST = 'RESET_STATE_ITEM_LIST';

const state = {
    loading: true,
    form: {},
    items: {
        count: 0,
        next: null,
        previous: null,
        results: []
    }
};

const getters = {
    itemListLoading: state => state.loading,
    itemListForm: state => state.form,
    itemListItems: state => state.items.results,
    itemListNext: state => state.items.next === null,
    itemListPrevious: state => state.items.previous === null
};

const actions = {
    [ITEM_GET_ALL]({commit}) {
        commit(FETCH_START_ITEMS);
        return api.item_get_all()
            .then(({data}) => {
                commit(FETCH_END_ITEMS, data)
            })
            .catch((error) => {
                throw new Error(error)
            })
    },
    [ITEM_GET_ITEMS_PAGE]({state, commit}, next) {
        let url = "";
        if (next) {
            url = state.items.next;
        } else {
            url = state.items.previous;
        }

        return api.generic_get(url)
            .then(({data}) => {
                commit(FETCH_END_ITEMS, data)
            })
            .catch((error) => {
                throw new Error(error)
            })
    },
    [ITEM_GET_SAVED]({commit}) {
        commit(FETCH_START_ITEMS);
        return api.item_get_saved()
            .then(({data}) => {
                commit(FETCH_END_ITEMS, data)
            })
            .catch((error) => {
                throw new Error(error)
            })
    },
    [ITEM_RECOMMEND]({commit}) {
        commit(FETCH_START_ITEMS);
        return api.item_recommend()
            .then(({data}) => {
                commit(FETCH_END_ITEMS, data)
            })
            .catch((error) => {
                throw new Error(error)
            })
    },
    [ITEM_SEARCH]({commit, state}) {
        commit(FETCH_START_ITEMS);
        return api.item_search(state.form)
            .then(({data}) => {
                commit(FETCH_END_ITEMS, data)
            })
            .catch((error) => {
                throw new Error(error)
            })
    },
    [ITEM_LIST_RESET]({commit}) {
        commit(RESET_STATE_ITEM_LIST);
    }
};

const mutations = {
    [FETCH_START_ITEMS](state) {
        state.loading = true
    },
    [FETCH_END_ITEMS](state, items) {
        state.items = items
        state.loading = false
    },
    [RESET_STATE_ITEM_LIST](state) {
        state.form = {};
        state.items = [];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
