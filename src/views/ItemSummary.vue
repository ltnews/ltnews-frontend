<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Summary"
                    subtitle="Last News group by keywords">
            </page-head>

            <v-layout>
                <v-flex xs12 sm6>
                    <v-slider v-model="params.days" thumb-label="always" max="30" label="Days"
                              @click="update"></v-slider>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-slider v-model="params.hours" thumb-label="always" max="48" label="Hours" @click="update"></v-slider>
                </v-flex>
            </v-layout>

            <v-flex v-for="section in itemSummarySummary" :key="section.id">
                <card-list-summary
                        :title="section.title"
                        :link="{name: 'SectionView', params: {id: section.id}}"
                        :keywords="section.keywords">
                </card-list-summary>
            </v-flex>
        </v-container>
    </v-flex>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {ITEM_SUMMARY} from '../stores/types'
    import PageHead from '../components/PageHead'
    import CardListSummary from '../components/CardListSummary'

    export default {
        name: 'ItemSummary',
        components: {PageHead, CardListSummary},
        data() {
            return {params: {days: 1, hours: 0}}
        },
        computed: {
            ...mapGetters([
                'itemSummarySummary',
            ])
        },
        mounted() {
            this.update();
        },
        methods: {
            update() {
                this.$store.dispatch(ITEM_SUMMARY, this.params).catch();
            }
        }
    }
</script>

<style scoped>

</style>
