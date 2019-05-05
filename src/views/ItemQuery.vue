<template>
  <v-flex xs12>
    <v-container>
      <page-head
        :title="'News by ' + this.query"
        subtitle="The news that contains this keyword">
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
  import {ITEM_QUERY} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItemList from '../components/CardItemList'

  export default {
    name: 'ItemQuery',
    props: {
      query: {type: String, required: true},
    },
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
      this.$store.dispatch(ITEM_QUERY, this.query);
    }
  }
</script>

<style scoped>

</style>
