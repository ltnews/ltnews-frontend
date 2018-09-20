<template>
  <v-flex xs12>
    <v-container grid-list-xl>
      <page-head
        :title="feedDetailFeed.title"
        :subtitle="feedDetailFeed.description">
      </page-head>

      <v-divider></v-divider>

      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex xs12 sm6 lg4 v-for="item in feedDetailItems" :key="item.id">
            <card-item :item="item"></card-item>
          </v-flex>
        </v-layout>
      </v-container>

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
  import {FEED_GET_ONE, FEED_GET_ITEMS} from '../store/types'
  import PageHead from '../components/PageHead'
  import CardItem from '../components/CardItem'

  export default {
    name: 'FeedView',
    components: {PageHead, CardItem},
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(FEED_GET_ONE, to.params.id),
        store.dispatch(FEED_GET_ITEMS, to.params.id)
      ]).then((data) => {
        next()
      })
    },
    computed: {
      ...mapGetters([
        'feedDetailFeed',
        'feedDetailItems'
      ])
    }
  }
</script>

<style scoped>

</style>
