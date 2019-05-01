<template>
    <v-container pa-0 fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm4 v-for="item in itemSimilarityListKeywords" :key="item.id">
                <card-item :item="item"></card-item>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import CardItem from './CardItem'
    import {mapGetters} from 'vuex'
    import {ITEM_GET_ONE_SIMILARITY} from '../stores/types'

    export default {
        name: "ItemSimilarityList",
        components: {CardItem},
        props: {
            item_id: {type: Number, required: true},
        },
        computed: {
            ...mapGetters([
                'itemSimilarityListKeywords'
            ])
        },
        watch: {
            item_id: {
                immediate: true,
                handler(value) {
                    this.$store.dispatch(ITEM_GET_ONE_SIMILARITY, value)
                        .catch(({response}) => {
                            this.errors = `${response.status}: ${response.statusText}`
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
