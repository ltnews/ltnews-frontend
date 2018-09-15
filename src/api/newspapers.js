import session from './session'

const ROOT = 'http://127.0.0.1:8000/'
const ROOT_NEWSPAPER = ROOT + 'section/'

export default {
  section_get_all () {
    return session.get(ROOT_NEWSPAPER)
  }
}
