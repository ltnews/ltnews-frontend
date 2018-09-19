<template>
  <v-card  height="100%">
    <v-img :src="item.image"></v-img>

    <v-card-title primary-title>
      <div>
        <span class="grey--text caption" v-text="item.pubDate"></span>
        <h3 class="headline" v-text="item.title"></h3>
        <div>{{ item.article | truncate }}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: 'CardItem',
    props: {
      item: {type: Object, required: true}
    },
    filters: {
      truncate: function (text) {
        let length = 150
        if (text.length <= length) {
          return text
        } else {
          return text.substring(0, length).replace(/\w+$/, '')
        }
      }
    }
  }
</script>

<style scoped>

</style>
