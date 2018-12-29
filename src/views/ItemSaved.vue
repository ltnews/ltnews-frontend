<template>
  <v-flex xs12>
    <v-container>
      <page-head
        title="Saved News"
        subtitle="All the news that you saved">
      </page-head>

      <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex xs12 sm6 lg4 v-for="item in itemListItems" :key="item.id">
            <card-item :item="item"></card-item>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ITEM_GET_SAVED} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardItem from '../components/CardItem'

  export default {
    name: 'ItemList',
    components: {PageHead, CardItem},
    computed: {
      ...mapGetters([
        'itemListLoading',
        'itemListItems',
        'itemListItemsCount'
      ])
    },
    mounted () {
      this.$store.dispatch(ITEM_GET_SAVED)
    }
  }
</script>

<style scoped>

</style>
