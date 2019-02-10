<template>
  <v-flex xs12>
    <v-container>
      <page-head
        title="Saved News"
        subtitle="All the news that you saved">
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
  import {ITEM_GET_SAVED} from '../stores/types'
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
      this.$store.dispatch(ITEM_GET_SAVED)
    }
  }
</script>

<style scoped>

</style>
