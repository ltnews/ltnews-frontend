import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

import auth from './stores/auth'
import password from './stores/password'
import signup from './stores/signup'
import profile from './stores/profile'
import profileForm from './stores/profileForm'
import profileImageForm from './stores/profileImageForm'
import sectionList from './stores/sectionList'
import sectionDetail from './stores/sectionDetail'
import feedDetail from './stores/feedDetail'
import feedForm from './stores/feedForm'
import itemList from './stores/itemList'
import itemDetail from './stores/itemDetail'
import keywordList from './stores/keywordList'
import itemSimilarityList from './stores/itemSimilarityList'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    password,
    signup,
    profile,
    profileForm,
    profileImageForm,
    sectionList,
    sectionDetail,
    feedDetail,
    feedForm,
    itemList,
    itemDetail,
    keywordList,
    itemSimilarityList
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
