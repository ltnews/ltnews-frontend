import session from './session'

const ROOT = 'http://127.0.0.1:8000/'
const ROOT_NEWSPAPER = ROOT + 'auth/'

export default {
  login (username, password) {
    return session.get(ROOT_NEWSPAPER + 'login/', { username, password })
  }
}
