<template>
    <v-flex xs12>
        <v-toolbar dense color="secondary">
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat :to="{name: 'ProfileImage'}">Image</v-btn>
                <v-btn dark flat :to="{name: 'ProfileEdit'}">Edit</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container grid-list-sm fluid>
            <page-head
                    title="Profile"
                    subtitle="In this view, you can modify all data of your profile">
            </page-head>

            <v-layout row text-xs-center>
                <v-flex xs12 d-flex>
                    <v-card :key="profile.id" class="pt-4 mx-auto" flat>
                        <v-card-text>
                            <v-avatar v-if="profile.image" size="150">
                                <v-img :src="profile.image" class="mb-4"></v-img>
                            </v-avatar>
                            <h3 class="headline mb-2">{{profile.user.first_name}} {{profile.user.last_name}}</h3>
                            <div class="primary--text mb-2">{{ profile.user.email }}</div>
                            <div class="primary--text subheading font-weight-bold">{{ profile.user.username }}</div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-layout tag="v-card-text" text-xs-left wrap>
                            <v-flex tag="strong" sm6 text-xs-right mr-3 mb-2>Date joined:</v-flex>
                            <v-flex>{{ profile.user.date_joined | moment }}</v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-card-text>
                            <template v-for="(keyword, index) in profile.keywords">
                                <v-chip :key="index" outline color="primary">{{keyword}}</v-chip>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import PageHead from '../components/PageHead'

    export default {
        name: 'ProfileView',
        components: {PageHead},
        computed: {
            ...mapGetters({
                profile: 'getProfile'
            })
        },
        filters: {
            moment: function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a')
            }
        }
    }
</script>

<style scoped>

</style>
