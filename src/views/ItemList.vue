<template>
    <v-container>
        <v-flex xs12>
            <page-head
                    title="News"
                    subtitle="All the news from the feeds that you follow">
            </page-head>

            <card-item-list
                    :items="itemListItems"
                    :previous="itemListPrevious"
                    :next="itemListNext"
                    action="ITEM_GET_ITEMS_PAGE">
            </card-item-list>
        </v-flex>
    </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ITEM_GET_ALL} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItemList from '../components/CardItemList'

  export default {
    name: 'ItemList',
    components: {PageHead, CardItemList},
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
    }
  }
</script>

<style scoped>

</style>
