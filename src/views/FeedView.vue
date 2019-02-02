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

            <v-divider></v-divider>

            <v-container fluid grid-list-sm>
                <v-layout row wrap>
                    <v-flex xs12 sm6 lg4 v-for="item in feedDetailItems" :key="item.id">
                        <card-item :item="item"></card-item>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-btn block color="accent" @click="paginate(false)" :disabled="feedDetailPrevious">Previous</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn block color="accent" @click="paginate(true)" :disabled="feedDetailNext">Next</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>

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
  import {FEED_GET_ONE, FEED_GET_ITEMS, FEED_DELETE, FEED_GET_ITEMS_PAGE} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItem from '../components/CardItem'

  export default {
    name: 'FeedView',
    components: {PageHead, CardItem},
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
      },
      paginate (next) {
        this.$store.dispatch(FEED_GET_ITEMS_PAGE, next)
          .catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      }
    }
  }
</script>

<style scoped>

</style>
