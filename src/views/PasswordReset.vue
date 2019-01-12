<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Reset Password"
                    subtitle="In this view, you can reset your forgotten password">
            </page-head>

            <v-alert :value="true" dismissible type="error" outline>
                Not working in the actual version.
            </v-alert>

            <template v-if="passwordEmailLoading">
                loading...
            </template>
            <template v-else-if="!passwordEmailCompleted">
                <p class="error--text" v-if="message" v-text="message"></p>
                <v-form ref="form" lazy-validation @submit.prevent="submit">
                    <v-text-field v-model="passwordEmailForm.email" label="Email" required
                                  :error-messages="errors.email"></v-text-field>

                    <v-btn type="submit" class="accent">Send Email</v-btn>
                </v-form>
            </template>
            <template v-else>
                <div>
                    Check your inbox for a link to reset your password. If an email doesn't appear within a few
                    minutes, check your spam folder.
                </div>
                <div>
                    <v-btn :to="{name: 'Login'}">Login</v-btn>
                </div>
            </template>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {PASSWORD_EMAIL, PASSWORD_EMAIL_RESET} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'PasswordReset',
    components: {PageHead},
    data () {
      return {
        errors: [],
        message: ''
      }
    },
    computed: {
      ...mapGetters([
        'passwordEmailCompleted',
        'passwordEmailError',
        'passwordEmailLoading',
        'passwordEmailForm'
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(PASSWORD_EMAIL)
          .catch(({response}) => {
              this.errors = response.data
              this.message = response.data['non_field_errors'].join(' ')
            }
          )
      }
    },
    async beforeRouteLeave (to, from, next) {
      await this.$store.dispatch(PASSWORD_EMAIL_RESET)
      return next()
    }
  }
</script>
