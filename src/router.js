import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import PasswordReset from './views/PasswordReset'
import PasswordResetConfirm from './views/PasswordResetConfirm'
import Register from './views/Register'
import VerifyEmail from './views/VerifyEmail'

import Home from './views/Home'
import ProfileView from './views/ProfileView'
import ProfileEdit from './views/ProfileEdit'
import ProfileImage from './views/ProfileImage'
import SectionList from './views/SectionList'
import SectionView from './views/SectionView'
import SectionEdit from './views/SectionEdit'
import FeedView from './views/FeedView'
import FeedCreate from './views/FeedCreate'
import ItemList from './views/ItemList'
import ItemView from './views/ItemView'
import ItemSaved from './views/ItemSaved'
import ItemSearch from './views/ItemSearch'

import store from './store'
import {LOGIN_INIT, LOGOUT} from './stores/types'

const initAuthenticated = (to, from, next) => {
  store.dispatch(LOGIN_INIT)
    .then(() => {
      next()
    })
}

const requireAuthenticated = (to, from, next) => {
  store.dispatch(LOGIN_INIT)
    .then(() => {
      if (!store.getters.isAuthenticated) {
        next({name: 'Login'})
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch(LOGIN_INIT)
    .then(() => {
      if (store.getters.isAuthenticated) {
        next({name: 'Home'})
      } else {
        next()
      }
    })
}

const redirectLogout = (to, from, next) => {
  store.dispatch(LOGOUT)
    .then(() => next({name: 'Login'}))
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: initAuthenticated,
      props: true
    },
    {
      path: '/password_reset',
      name: 'PasswordReset',
      component: PasswordReset,
      props: true
    },
    {
      path: '/password_reset/:uid/:token',
      name: 'PasswordResetConfirm',
      component: PasswordResetConfirm,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '/register/:key',
      name: 'VerifyEmail',
      component: VerifyEmail,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: requireUnauthenticated,
      props: true
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: redirectLogout,
      props: true
    },
    {
      path: '/profile/view',
      name: 'ProfileView',
      component: ProfileView,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/profile/image',
      name: 'ProfileImage',
      component: ProfileImage,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/section/list',
      name: 'SectionList',
      component: SectionList,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/section/view/:id',
      name: 'SectionView',
      component: SectionView,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/section/edit/:id?',
      name: 'SectionEdit',
      component: SectionEdit,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/feed/view/:id',
      name: 'FeedView',
      component: FeedView,
      props: true
    },
    {
      path: '/feed/create',
      name: 'FeedCreate',
      component: FeedCreate,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/item/list',
      name: 'ItemList',
      component: ItemList,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/item/saved',
      name: 'ItemSaved',
      component: ItemSaved,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/item/search',
      name: 'ItemSearch',
      component: ItemSearch,
      beforeEnter: requireAuthenticated,
      props: true
    },
    {
      path: '/item/view/:id',
      name: 'ItemView',
      component: ItemView,
      props: true
    },
    {
      path: '*',
      redirect: '/',
      props: true
    }
  ]
})
