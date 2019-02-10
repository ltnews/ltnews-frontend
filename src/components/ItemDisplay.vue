<template>
    <v-flex>
        <h1 class="display-2 mb-3" v-text="item.title"></h1>
        <h4 class="subheading text-xs-right mb-2" v-text="formatDate"></h4>

        <div class="text-xs-justify" v-html="item.article"></div>
        <p class="text-xs-right" v-text="item.creator"></p>
    </v-flex>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'ItemDisplay',
    props: {
      item: {type: Object, required: true}
    },
    computed: {
      formatDate: function () {
        return moment(this.item.pubDate).calendar()
      }
    }
  }
</script>

<style scoped>

</style>
