<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    :title="(sectionDetailSection.id ? 'Edit' : 'Create') + ' Section'"
                    :subtitle="'In this form, you can ' + (sectionDetailSection.id ? 'edit' : 'create') + ' the section'">
            </page-head>

            <v-flex>
                <p class="error--text" v-if="errors" v-text="errors"></p>
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit(sectionDetailSection.id)">
                    <v-text-field v-model="sectionDetailSection.title" :rules="stringRules" label="Title"
                                  required></v-text-field>
                    <v-text-field v-model="sectionDetailSection.description" label="Description"></v-text-field>

                    <v-btn :disabled="!valid" type="submit" class="accent">Submit</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-form>
            </v-flex>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {SECTION_GET_ONE, SECTION_POST, SECTION_PUT, SECTION_RESET} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'SectionEdit',
    components: {PageHead},
    data () {
      return {
        valid: true,
        errors: '',
        stringRules: [
          v => !!v || 'Name is required',
          v => (v && v.length > 3) || 'Name must be more than 3 characters'
        ]
      }
    },
    async beforeRouteEnter (to, from, next) {
      await store.dispatch(SECTION_RESET)
      if (to.params.id !== undefined) {
        await store.dispatch(SECTION_GET_ONE, to.params.id)
      }
      return next()
    },
    async beforeRouteUpdate (to, from, next) {
      await store.dispatch(SECTION_RESET)
      return next()
    },
    async beforeRouteLeave (to, from, next) {
      await store.dispatch(SECTION_RESET)
      return next()
    },
    computed: {
      ...mapGetters([
        'sectionDetailSection'
      ])
    },
    methods: {
      submit (id) {
        let action = id ? SECTION_PUT : SECTION_POST
        this.$store.dispatch(action)
          .then(({data}) => {
            this.$router.push({name: 'SectionView', params: {id: data.id}})
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
