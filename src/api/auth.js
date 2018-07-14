import session from './session'

const ROOT = 'http://127.0.0.1:8000/'
const ROOT_AUTH = ROOT + 'auth/'

export default {
  login (username, password) {
    return session.post(ROOT_AUTH + 'login/', { username, password })
  },
  logout () {
    return session.post(ROOT_AUTH + 'logout/', {})
  },
  createAccount (username, password1, password2, email) {
    return session.post(ROOT + 'registration/', { username, password1, password2, email })
  },
  changeAccountPassword (password1, password2) {
    return session.post(ROOT_AUTH + 'password/change/', { password1, password2 })
  },
  sendAccountPasswordResetEmail (email) {
    return session.post(ROOT_AUTH + 'password/reset/', { email })
  },
  resetAccountPassword (uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post(ROOT_AUTH + 'password/reset/confirm/', { uid, token, new_password1, new_password2 })
  },
  getAccountDetails () {
    return session.get(ROOT_AUTH + 'user/')
  },
  updateAccountDetails (data) {
    return session.patch(ROOT_AUTH + 'user/', data)
  },
  verifyAccountEmail (key) {
    return session.post(ROOT + 'registration/verify-email/', { key })
  }
}
