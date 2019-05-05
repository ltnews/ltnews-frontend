<template>
  <v-flex xs12>
    <v-container>
      <page-head
        title="Recommended News"
        subtitle="All the news that you want">
      </page-head>

      <card-item-list
              :items="itemListItems"
              :previous="itemListPrevious"
              :next="itemListNext"
              action="ITEM_GET_ITEMS_PAGE">
      </card-item-list>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ITEM_RECOMMEND} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItemList from '../components/CardItemList'

  export default {
    name: 'ItemRecommend',
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
      this.$store.dispatch(ITEM_RECOMMEND)
    }
  }
</script>

<style scoped>

</style>
