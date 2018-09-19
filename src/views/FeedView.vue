<template>
  <v-flex xs12>
    <v-container grid-list-xl>
      <page-head
        :title="feedDetailFeed.title"
        :subtitle="feedDetailFeed.description">
      </page-head>

      <v-btn
        absolute
        fab
        top
        right
        color="error"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {FEED_GET_ONE} from '../store/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'FeedView',
    components: {PageHead},
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(FEED_GET_ONE, to.params.id)
      ]).then((data) => {
        next()
      })
    },
    computed: {
      ...mapGetters([
        'feedDetailFeed'
      ])
    }
  }
</script>

<style scoped>

</style>
