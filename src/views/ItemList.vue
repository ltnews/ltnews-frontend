<template>
    <v-flex xs12>
        <v-container>
            <page-head
                    title="News"
                    subtitle="All the news from the feeds that you follow">
            </page-head>

            <v-container fluid grid-list-sm>
                <v-layout row wrap>
                    <v-flex xs12 sm6 lg4 v-for="item in itemListItems" :key="item.id">
                        <card-item :item="item"></card-item>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-btn block color="accent" @click="paginate(false)" :disabled="itemListPrevious">Previous
                        </v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn block color="accent" @click="paginate(true)" :disabled="itemListNext">Next</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ITEM_GET_ALL, ITEM_GET_ITEMS_PAGE} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItem from '../components/CardItem'

  export default {
    name: 'ItemList',
    components: {PageHead, CardItem},
    computed: {
      ...mapGetters([
        'itemListLoading',
        'itemListItems',
        'itemListNext',
        'itemListPrevious'
      ])
    },
    mounted () {
      this.$store.dispatch(ITEM_GET_ALL)
    },
    methods: {
      paginate (next) {
        this.$store.dispatch(ITEM_GET_ITEMS_PAGE, next)
          .catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      }
    }
  }
</script>

<style scoped>

</style>
