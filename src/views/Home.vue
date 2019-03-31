<template>
    <v-flex>
        <section>
            <v-parallax :src="require('../assets/newspaper.jpg')" height="600">
                <v-layout
                        column
                        align-center
                        justify-center
                        class="white--text"
                >
                    <img src="../assets/icon.png" alt="Vuetify.js" height="200">
                    <h1 class="white--text mt-2 mb-2 display-1 text-xs-center">LT-News</h1>
                    <div class="subheading mb-3 text-xs-center">Another option to read the digital newspaper</div>
                    <v-btn
                            class="mt-5"
                            color="accent"
                            dark
                            large
                            :to="{name: 'ItemList'}"
                    >
                        Get Started
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout
                    column
                    wrap
                    class="my-5"
                    align-center
            >
                <v-flex xs12 sm4 class="my-3">
                    <div class="text-xs-center">
                        <h2 class="headline">Why LT-News?</h2>
                        <span class="subheading">
                It arises from the need to be informed, but the huge amount of resources and the few time is a real problem.
              </span>
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large color="primary">rss_feed</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Read news</div>
                                    </v-card-title>
                                    <v-card-text>
                                        LT-News is, definitely, a news' reader from the newspapers o blogs that you follow.
                                        In this site, you will follow some online newspaper or blog. How? Through its RSS syndication.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large color="primary">group_work</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Group news</div>
                                    </v-card-title>
                                    <v-card-text>
                                        LT-News group related news. Thank to this, you will find out what other newspapers says about the same news.
                                        You can also follow the evolution of a new.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large color="primary">group</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Made for you</div>
                                    </v-card-title>
                                    <v-card-text>
                                        As you using LT-News, it will make you knowing more and more.
                                        It will recommend news based on your interests.
                                        So, you will never be lost among infinity news.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <section>
            <v-parallax :src="require('../assets/internet.jpg')" height="380">
                <v-layout column align-center justify-center>
                    <div class="headline white--text mb-3 text-xs-center">Newspaper union</div>
                    <em>When you log in, you will view the newspaper or blogs that you follow.</em>
                    <v-btn
                            class="mt-5"
                            color="accent"
                            dark
                            large
                            :to="{name: 'SectionList'}"
                    >
                        Get Started
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Company info</div>
                            </v-card-title>
                            <v-card-text>
                                LT-News learns of your form of reading news: it detects your interests and it recommends
                                you news that may interest you. It converts the digital press in a new world for you.
                                It is not yet the typical newspaper (large and bored); it is web designed for you
                                complety. It is possible thanks a recommends tools and machine learning...
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4 offset-sm1>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Contact us</div>
                            </v-card-title>
                            <v-card-text>
                                Converting the sea of daily news into a glass for each, that allows it to be token at the time the user wants.
                            </v-card-text>
                            <v-list class="transparent">
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="accent">person</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Andrés Jiménez</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="accent">place</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Seville, Spain</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="accent">email</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>lt.news.app@gmail.com</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-flex>
</template>
