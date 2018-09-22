<template>
  <v-flex xs12>
    <v-container grid-list-xl>
      <page-head
        title="Add Feed"
        subtitle="Add a new feed">
      </page-head>

      <v-flex>
        <p class="error--text" v-if="errors" v-text="errors"></p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="feedForm.url" label="URL" required></v-text-field>
          <v-text-field v-model="feedForm.section" label="Section" required></v-text-field>

          <v-btn :disabled="!valid" @click="submit()" class="accent">Submit</v-btn>
          <v-btn @click="cancel()">Cancel</v-btn>
        </v-form>
      </v-flex>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {FEED_RESET, FEED_POST} from '../store/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'FeedCreate',
    components: {PageHead},
    data () {
      return {
        valid: true,
        errors: ''
      }
    },
    async beforeRouteEnter (to, from, next) {
      await store.dispatch(FEED_RESET)
      return next()
    },
    async beforeRouteUpdate (to, from, next) {
      await store.dispatch(FEED_RESET)
      return next()
    },
    async beforeRouteLeave (to, from, next) {
      await store.dispatch(FEED_RESET)
      return next()
    },
    computed: {
      ...mapGetters([
        'feedForm'
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(FEED_POST)
          .then(({data}) => {
            this.$router.push({name: 'SectionList'})
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      },
      cancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
