<template>
    <v-textarea
            append-icon="send"
            @click:append=submit
            box
            label="Your comment"
            auto-grow
            v-model="comment.description"
    ></v-textarea>
</template>

<script>
  import {COMMENT_POST} from '../stores/types'

  export default {
    name: 'CommentForm',
    props: {
      comment: {type: Object, required: true}
    },
    methods: {
      submit: function () {
        this.$store.dispatch(COMMENT_POST)
          .then(() => {
            this.errors = ''
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      }
    }
  }
</script>

<style scoped>

</style>
