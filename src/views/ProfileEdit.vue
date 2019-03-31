<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Edit Profile"
                    subtitle="Change the information of your account">
            </page-head>

            <p class="error--text" v-if="message" v-text="message"></p>
            <v-form ref="form" lazy-validation @submit.prevent="submit">
                <v-text-field v-model="profileForm.username" label="Username" required
                              :error-messages="errors.username"></v-text-field>
                <v-text-field v-model="profileForm.first_name" label="First Name" required
                              :error-messages="errors.first_name"></v-text-field>
                <v-text-field v-model="profileForm.last_name" label="Last Name" required
                              :error-messages="errors.last_name"></v-text-field>

                <v-btn type="submit" class="accent">Submit</v-btn>
            </v-form>
        </v-container>
    </v-flex>
</template>

<script>
  import store from '../store'
  import {mapGetters} from 'vuex'
  import {PROFILE_PUT, PROFILE_OLD, PROFILE_GET_ONE} from '../stores/types'
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
        'profileForm',
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(PROFILE_PUT)
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
      await store.dispatch(PROFILE_OLD)
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
