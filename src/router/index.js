import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import PasswordReset from '../views/PasswordReset'
import PasswordResetConfirm from '../views/PasswordResetConfirm'
import Register from '../views/Register'
import VerifyEmail from '../views/VerifyEmail'

import Home from '../views/Home'
import SectionList from '../views/SectionList'
import SectionView from '../views/SectionView'
import SectionEdit from '../views/SectionEdit'
import FeedView from '../views/FeedView'
import FeedCreate from '../views/FeedCreate'
import ItemList from '../views/ItemList'
import ItemView from '../views/ItemView'
import ItemSaved from '../views/ItemSaved'

import store from '../store'

const initAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => { next() })
}

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/')
      } else {
        next()
      }
    })
}

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/login'))
}

Vue.use(Router)

export default new Router({
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
      name: 'PasswordResetConfirm',
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
