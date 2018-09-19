import session from './session'

const SECTION = 'section'
const FEED = 'feed'
const ITEM = 'item'

function makeURL (entity, id) {
  if (id === undefined) {
    return `./${entity}/`
  } else {
    return `./${SECTION}/${id}/`
  }
}

export default {
  section_get_all () {
    return session.get(makeURL(SECTION))
  },
  sections_post (section) {
    return session.post(makeURL(SECTION), section)
  },
  section_get_one (id) {
    return session.get(makeURL(SECTION, id))
  },
  section_put (id, section) {
    return session.put(makeURL(SECTION, id), section)
  },
  section_delete (id) {
    return session.delete(makeURL(SECTION, id))
  },
  feed_get_one (id) {
    return session.get(makeURL(FEED, id))
  },
  item_get_all () {
    return session.get(makeURL(ITEM))
  }
}
