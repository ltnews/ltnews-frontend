<template>
  <v-flex xs12>
    <v-toolbar dense color="secondary">
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn dark flat @click="remove(feedDetailFeed.id)">Delete</v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {FEED_GET_ONE, FEED_GET_ITEMS, FEED_DELETE} from '../store/types'
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
    },
    methods: {
      remove (id) {
        this.$store.dispatch(FEED_DELETE)
          .then(({data}) => {
            this.$router.push({name: 'SectionList'})
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      }
    }
  }
</script>

<style scoped>

</style>
