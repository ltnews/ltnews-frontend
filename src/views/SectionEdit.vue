<template>
  <v-flex xs12>
    <v-container grid-list-xl>
      <page-head
        title="Edit Section"
        subtitle="In this form, you can edit the section">
      </page-head>

      <v-flex>
        <p class="error--text" v-if="errors" v-text="errors"></p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="sectionDetailSection.title" :rules="stringRules" label="Title" required></v-text-field>
          <v-text-field v-model="sectionDetailSection.description" label="Description"></v-text-field>

          <v-btn :disabled="!valid" @click="submit(sectionDetailSection.id)">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {SECTION_GET_ONE, SECTION_POST, SECTION_PUT, SECTION_RESET} from '../store/types'
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
      if (to.params.id !== undefined) {
        await store.dispatch(SECTION_GET_ONE, to.params.id)
      }
      return next()
    },
    async beforeRouteUpdate (to, from, next) {
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
      clear () {
        this.$refs.form.reset()
        this.errors = ''
      }
    }
  }
</script>

<style scoped>

</style>
