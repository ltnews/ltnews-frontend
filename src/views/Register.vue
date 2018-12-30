<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Register"
                    subtitle="Create Account">
            </page-head>

            <template v-if="registrationLoading">
                loading...
            </template>
            <template v-else-if="!registrationCompleted">
                <p class="error--text" v-if="message" v-text="message"></p>
                <v-form ref="form" lazy-validation @submit.prevent="submit">
                    <v-text-field v-model="registerForm.username" label="Username" required
                                  :error-messages="errors.username"></v-text-field>
                    <v-text-field v-model="registerForm.first_name" label="First Name" required
                                  :error-messages="errors.first_name"></v-text-field>
                    <v-text-field v-model="registerForm.last_name" label="Last Name" required
                                  :error-messages="errors.last_name"></v-text-field>
                    <v-divider></v-divider>
                    <v-text-field v-model="registerForm.password1" label="Password" type="password" required
                                  :error-messages="errors.password1"></v-text-field>
                    <v-text-field v-model="registerForm.password2" label="Confirm Password" type="password" required
                                  :error-messages="errors.password2"></v-text-field>
                    <v-divider></v-divider>
                    <v-text-field v-model="registerForm.email" label="Email" required
                                  :error-messages="errors.email"></v-text-field>
                    <v-text-field v-model="registerForm.image" label="Image URL" required
                                  :error-messages="errors.image"></v-text-field>

                    <v-btn type="submit" class="accent">Submit</v-btn>
                    <v-btn :to="{name: 'Login'}">Login</v-btn>
                    <v-btn :to="{name: 'PasswordReset'}" outline class="accent">Reset Password</v-btn>
                </v-form>
            </template>
            <template v-else>
                <div>
                    Registration complete. You should receive an email shortly with instructions on how to
                    activate your account.
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
  import {REGISTER, REGISTER_RESET} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'Login',
    components: {PageHead},
    data () {
      return {
        errors: [],
        message: ''
      }
    },
    computed: {
      ...mapGetters([
        'registerForm',
        'registrationLoading',
        'registrationCompleted'
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(REGISTER)
          .then(() => {
            this.$router.push({name: 'Home'})
          }).catch(({response}) => {
            this.errors = response.data
            this.message = response.data['non_field_errors'].join(" ")
          }
        )
      }
    },
    async beforeRouteLeave (to, from, next) {
      await this.$store.dispatch(REGISTER_RESET)
      return next()
    }
  }
</script>
