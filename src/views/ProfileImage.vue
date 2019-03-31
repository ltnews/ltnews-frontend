<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Edit Avatar"
                    subtitle="Change your avatar">
            </page-head>

            <v-layout>
                <v-flex xs12 md6 text-xs-center>
                    <v-avatar color="grey lighten-4" size="150">
                        <img :src="profileImageForm.image" alt="avatar">
                    </v-avatar>
                </v-flex>
                <v-flex xs12 md6>
                    <p class="error--text" v-if="message" v-text="message"></p>
                    <v-form ref="form" lazy-validation @submit.prevent="submit">
                        <v-text-field v-model="profileImageForm.image" label="Image URL" required
                                      :error-messages="errors.image"></v-text-field>

                        <v-btn type="submit" class="accent">Submit</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>

        </v-container>
    </v-flex>
</template>

<script>
  import store from '../store'
  import {mapGetters} from 'vuex'
  import {PROFILE_IMAGE_PUT, PROFILE_IMAGE_OLD, PROFILE_GET_ONE} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'ProfileEdit',
    components: {PageHead},
    data () {
      return {
        errors: [],
        message: ''
      }
    },
    computed: {
      ...mapGetters([
        'profileImageForm',
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(PROFILE_IMAGE_PUT)
          .then(() => {
            this.$router.push({name: 'ProfileView'})
          }).catch(({response}) => {
            this.errors = response.data
            this.message = response.data['non_field_errors'].join(" ")
          }
        )
      }
    },
    async beforeRouteEnter (to, from, next) {
      await store.dispatch(PROFILE_IMAGE_OLD)
      return next()
    },
    async beforeRouteLeave (to, from, next) {
      await store.dispatch(PROFILE_GET_ONE)
      return next()
    }
  }
</script>

<style scoped>

</style>
