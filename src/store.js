import Vue from 'vue'
import Vuex from 'vuex'
//import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

import auth from './store/auth'
import password from './store/password'
import signup from './store/signup'
import profile from './store/profile'
import sectionList from './store/sectionList'
import sectionDetail from './store/sectionDetail'
import feedDetail from './store/feedDetail'
import feedForm from './store/feedForm'
import itemList from './store/itemList'
import itemDetail from './store/itemDetail'

//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    password,
    signup,
    profile,
    sectionList,
    sectionDetail,
    feedDetail,
    feedForm,
    itemList,
    itemDetail
  },
  //strict: debug,
  //plugins: debug ? [createLogger()] : []
})
