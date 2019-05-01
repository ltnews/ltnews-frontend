<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="News search"
                    subtitle="Looking for the news">
            </page-head>

            <p class="error--text" v-if="message" v-text="message"></p>
            <v-form ref="form" lazy-validation @submit.prevent="submit">
                <v-layout v-if="toggle">
                    <v-flex xs12>
                        <v-text-field v-model="itemListForm.query" label="Query" required
                                      :error-messages="errors.query"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout v-else>
                    <v-flex xs12 md4>
                        <v-text-field v-model="itemListForm.title" label="Title"
                                      :error-messages="errors.title"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field v-model="itemListForm.creator" label="Author"
                                      :error-messages="errors.creator"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field v-model="itemListForm.article" label="Article"
                                      :error-messages="errors.article"></v-text-field>
                    </v-flex>
                </v-layout>

                <div class="text-xs-center">
                    <v-btn outline color="info" @click="change()">
                        {{toggle ? 'Advanced' : 'Simple'}}
                    </v-btn>
                    <v-btn type="submit" color="accent">Submit</v-btn>
                </div>
            </v-form>

            <div class="mt-3 mb-3"></div>

            <card-item-list
                    :items="itemListItems"
                    :previous="itemListPrevious"
                    :next="itemListNext"
                    action="ITEM_GET_ITEMS_PAGE">
            </card-item-list>
        </v-container>
    </v-flex>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PageHead from '../components/PageHead'
    import {ITEM_SEARCH} from '../stores/types'
    import CardItemList from '../components/CardItemList'

    export default {
        name: "ItemSearch",
        components: {PageHead, CardItemList},
        data () {
            return {
                errors: [],
                message: '',
                toggle: true
            }
        },
        computed: {
            ...mapGetters([
                'itemListLoading',
                'itemListForm',
                'itemListFormSimple',
                'itemListItems',
                'itemListNext',
                'itemListPrevious'
            ])
        },
        methods: {
            submit () {
                this.$store.dispatch(ITEM_SEARCH)
                    .catch(({response}) => {
                        this.errors = response.data;
                        this.message = response.data['non_field_errors'].join(" ");
                    }
                )
            },
            change() {
                if (this.toggle) {
                    this.itemListForm.query = null;
                } else {
                    this.itemListForm.title = null;
                    this.itemListForm.creator = null;
                    this.itemListForm.article = null;
                }
                this.toggle = !this.toggle
            }
        },
    }
</script>

<style scoped>

</style>
