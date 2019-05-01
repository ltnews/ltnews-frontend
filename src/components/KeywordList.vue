<template>
    <div class="text-xs-center">
        <template  v-for="(keyword, index) in keywordListKeywords">
            <v-chip :key="index" outline color="primary">{{keyword}}</v-chip>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {ITEM_GET_ONE_KEYWORDS} from '../stores/types'

    export default {
        name: "KeywordList",
        props: {
            item_id: {type: Number, required: true},
        },
        computed: {
            ...mapGetters([
                'keywordListKeywords'
            ])
        },
        watch: {
            item_id: {
                immediate: true,
                handler(value) {
                    this.$store.dispatch(ITEM_GET_ONE_KEYWORDS, value)
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
