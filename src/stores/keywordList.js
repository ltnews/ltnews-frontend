import api from '../api/api'

import {ITEM_GET_ONE_KEYWORDS} from './types'
const FETCH_START_KEYWORDS = 'FETCH_START_KEYWORDS';
const FETCH_END_KEYWORDS = 'FETCH_END_KEYWORDS';

const state = {
    loading: true,
    keywords: []
};

const getters = {
    keywordListLoading: state => state.loading,
    keywordListKeywords: state => state.keywords,
};

const actions = {
    [ITEM_GET_ONE_KEYWORDS] ({ commit }, item_id) {
        commit(FETCH_START_KEYWORDS);
        return api.item_get_one_keywords(item_id)
            .then(({ data }) => { commit(FETCH_END_KEYWORDS, data) })
            .catch((error) => { throw new Error(error) })
    }
};

const mutations = {
    [FETCH_START_KEYWORDS] (state) {
        state.loading = true;
        state.keywords = [];
    },
    [FETCH_END_KEYWORDS] (state, keywords) {
        state.loading = false;
        state.keywords = keywords;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
