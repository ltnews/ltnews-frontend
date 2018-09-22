import session from './session'

const SECTION = 'section'
const FEED = 'feed'
const ITEM = 'item'

function makeURL (entity, id, other) {
  let url = `./${entity}/`

  if (id !== undefined) {
    url += `${id}/`
  }
  if (other !== undefined) {
    url += `${other}/`
  }

  return url
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
  feed_get_items (id) {
    return session.get(makeURL(FEED, id, 'items'))
  },
  feed_delete (id) {
    return session.delete(makeURL(FEED, id))
  },
  item_get_all () {
    return session.get(makeURL(ITEM))
  },
  item_get_one (id) {
    return session.get(makeURL(ITEM, id))
  },
  comment_get_all (id) {
    return session.get(makeURL(ITEM, id, 'comments'))
  },
  comment_post (id, comment) {
    return session.post(makeURL(ITEM, id, 'comments'), comment)
  }
}
