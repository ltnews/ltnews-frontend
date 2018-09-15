import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import PasswordReset from '../views/PasswordReset'
import PasswordResetConfirm from '../views/PasswordResetConfirm'
import Register from '../views/Register'
import VerifyEmail from '../views/VerifyEmail'

import Home from '../views/Home'
import Newspaper from '../views/Newspaper'

import store from '../store'

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
      component: Home
    },
    {
      path: '/newspaper',
      name: 'Newspaper',
      component: Newspaper,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/password_reset',
      component: PasswordReset
    },
    {
      path: '/password_reset/:uid/:token',
      component: PasswordResetConfirm
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/register/:key',
      component: VerifyEmail
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/logout',
      beforeEnter: redirectLogout
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
