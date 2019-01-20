<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Add Feed"
                    subtitle="Add a new feed">
            </page-head>

            <v-flex>
                <v-progress-linear :active="loading" color="accent" :indeterminate="loading"></v-progress-linear>

                <p class="error--text" v-if="errors" v-text="errors"></p>
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
                    <v-combobox prepend-icon="language" v-model="feedForm.url" label="URL" :rules="urlRules"
                                :items="feedLinks" required></v-combobox>
                    <v-combobox prepend-icon="class" v-model="feedForm.section" label="Section" :items="sectionNames"
                                required></v-combobox>

                    <v-btn :disabled="!valid" type="submit" class="accent">Submit</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-form>
            </v-flex>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '../store'
  import api from '../api/api'
  import {FEED_RESET, FEED_POST} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'FeedCreate',
    components: {PageHead},
    data () {
      return {
        valid: true,
        errors: '',
        loading: false,
        urlRules: [
          v => !!v || 'URL is required',
          v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(v) || 'URL is not valid'
        ],
        sectionNames: [],
        feedLinks: []
      }
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
        this.loading = true
        this.$store.dispatch(FEED_POST)
          .then(() => {
            this.$router.push({name: 'SectionList'})
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      },
      cancel () {
        this.$router.go(-1)
      }
    },
    mounted () {
      api.section_all_names().then(({data}) => this.sectionNames = data)
      api.feed_all_links().then(({data}) => this.feedLinks = data)
    }
  }
</script>

<style scoped>

</style>
