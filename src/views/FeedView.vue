<template>
    <v-flex xs12>
        <v-toolbar dense color="secondary">
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat @click="toast = true">Delete</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container grid-list-xl>
            <page-head
                    :title="feedDetailFeed.title"
                    :subtitle="feedDetailFeed.description">
            </page-head>

            <card-item-list
                    :items="feedDetailItems"
                    :previous="feedDetailPrevious"
                    :next="feedDetailNext"
                    action="FEED_GET_ITEMS_PAGE">
            </card-item-list>

            <v-snackbar v-model="toast" right color="secondary">
                Do you want to remove this feed?
                <v-btn color="accent" flat @click="remove()">Yes</v-btn>
            </v-snackbar>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {FEED_GET_ONE, FEED_GET_ITEMS, FEED_DELETE} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItemList from '../components/CardItemList'

  export default {
    name: 'FeedView',
    components: {PageHead, CardItemList},
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(FEED_GET_ONE, to.params.id),
        store.dispatch(FEED_GET_ITEMS, to.params.id)
      ]).then(() => {
        next()
      })
    },
    data () {
      return {
        errors: '',
        toast: false
      }
    },
    computed: {
      ...mapGetters([
        'feedDetailFeed',
        'feedDetailItems',
        'feedDetailNext',
        'feedDetailPrevious'
      ])
    },
    methods: {
      remove () {
        this.$store.dispatch(FEED_DELETE)
          .then(() => {
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
