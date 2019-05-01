<template>
    <v-flex>
        <h1 class="display-2 mb-3" v-text="item.title"></h1>
        <h4 class="subheading text-xs-right mb-2"><a @click="change_article()" v-text="formatDate"></a></h4>

        <div class="text-xs-justify" v-html="article"></div>
        <div class="text-xs-right">
            <router-link class="body-2" :to="{name: 'FeedView', params: {id: item.feed.id}}"
                         v-text="item.feed.title"></router-link>
            |
            <a class="body-1" v-text="item.creator"></a>
        </div>
    </v-flex>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'ItemDisplay',
    props: {
      item: {type: Object, required: true}
    },
    data () {
      return {
        article: ''
      }
    },
    computed: {
      formatDate: function () {
        return moment(this.item.pubDate).calendar()
      }
    },
    methods: {
      change_article () {
        if (this.article === this.item.article_html) {
          this.article = this.item.description_html
        } else {
          this.article = this.item.article_html
        }
      }
    },
    mounted() {
        this.article = this.item.description_html;
    }
  }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }
</style>
