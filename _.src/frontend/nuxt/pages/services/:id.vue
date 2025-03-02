<template>
    <div class="services-id pb-12">
        <v-container class="pb-0 mb-3 white">
            <div class="d-flex align-center justify-space-between gap-3 py-4">
                <Breadcrumbs />

                <div class="d-flex align-center gap-2 black--text">
                    <v-btn icon>
                        <v-icon>mdi-star-outline</v-icon>
                    </v-btn>
                    <v-btn @click="share" icon>
                        <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-container>

        <v-container class="mb-3">
            <Carousel>
                <div v-for="(src, idx) in slides" :key="idx" class="carousel-cell">
                    <img :data-flickity-lazyload="src" class="rounded-xl"></img>
                </div>
            </Carousel>
        </v-container>

        <v-container>
            <div class="text-h5 font-weight-medium">{{ service.title }}</div>
            <div class="text--secondary text-body-2">{{ service.agency }}</div>
            <div class="d-flex justify-space-between align-center">
                <ServicePrice :service="service" />
                <ServiceRating :service="service" full class="flex-column" />
            </div>
        </v-container>

        <v-container>
            <div class="white rounded-xl pa-4">
                <div class="text-h7 font-weight-medium mb-2">Description</div>
                <div class="text-body-2">{{ service.description }}</div>
            </div>
        </v-container>

        <v-container>
            <div class="white rounded-xl pa-4">
                <div class="d-flex justify-space-between mb-3">
                    <div class="text-h7 font-weight-medium mb-2">Reviews</div>
                    <NuxtLink to="#" class="teal--text text--lighten-2">See More</NuxtLink>
                </div>
                <div class="d-flex gap-3 flex-column">
                    <template v-for="(review, idx) in reviews">
                        <div :key="idx" class="d-flex gap-3">
                            <v-avatar>
                                <v-img :src="review.img"></v-img>
                            </v-avatar>
                            <div class="flex-grow-1">
                                <div class="text-body-2 font-weight-medium">{{ review.author }}</div>
                                <div class="d-flex gap-3 align-center">
                                    <div>
                                        <v-rating :value="review.stars" readonly color="yellow" empty-icon="mdi-star"
                                            background-color="grey" length="5" size="14" dense></v-rating>
                                    </div>
                                    <div class="text-body-3 text--secondary">{{ review.date }}</div>
                                </div>
                                <div class="text-body-2 font-weight-light">{{ review.text }}</div>
                            </div>
                            <div><v-icon class="grey--text">mdi-dots-vertical</v-icon></div>
                        </div>
                        <v-divider v-if="idx < reviews.length - 1"></v-divider>
                    </template>
                </div>
            </div>
        </v-container>

        <v-container class="mb-16">
            <div class="white rounded-xl pa-4">
                <div class="text-h7 font-weight-medium mb-2">FAQ</div>

                <v-expansion-panels flat class="gap-4 mb-4">
                    <v-expansion-panel v-for="(panel, idx) in faq" :key="idx" class="grey lighten-4 rounded-lg">
                        <v-expansion-panel-header>
                            <v-icon class="me-3">mdi-comment-question-outline</v-icon>
                            {{ panel.title }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ panel.content }}
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div class="d-flex">
                    <v-btn x-large class="teal lighten-5 elevation-0 teal--text flex-grow-1">I have Questions</v-btn>
                </div>
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="pt-4">
                <div class="d-flex flex-column mb-1">
                    <div class="agents-item d-flex gap-4 justify-space-between">
                        <v-avatar><img :src="agent.avatar" alt="Avatar"></v-avatar>
                        <div class="d-flex flex-column">
                            <div class="d-flex align-center gap-2">
                                <span>{{ agent.name + " " + agent.surname }}</span>
                                <v-icon class="teal--text" small>mdi-check-circle</v-icon>
                            </div>
                            <div class="caption">{{ agent.address }}</div>
                        </div>
                        <v-btn fab class="elevation-0" small>
                            <Icon icon="chat" />
                        </v-btn>
                        <v-btn fab class="elevation-0 green white--text" small>
                            <v-icon>mdi-whatsapp</v-icon>
                        </v-btn>
                    </div>
                </div>

                <p class="text-body-4 text--secondary mb-0">
                    I confirm that I have read the <span class="teal--color">privacy policy</span>
                    and allow my
                    information to be shared with this agent who may contact me later.
                </p>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import servicesManager from '@/services/services'
import agentService from '~/services/agent';
import shareService from '~/services/share';

export default {
    route: {
        title: "Details"
    },
    data() {
        return {
            faq: [
                { title: 'What documents are required for buying house?', content: '' },
                { title: 'What documents are required for buying house?', content: '' },
                { title: 'What documents are required for buying house?', content: '' },
                { title: 'What documents are required for buying house?', content: '' },
                { title: 'What documents are required for buying house?', content: '' },
            ]
        }
    },
    computed: {
        service() {
            return servicesManager.getAll().find(service => service.id == this.$route.params.id)
        },
        slides() {
            return this.service?.posters || []
        },
        reviews() {
            return servicesManager.getAllReviews()
        },
        agent() {
            return agentService.getAgent(this.service.agent)
        }
    },
    methods: {
        share() {
            shareService.showShareDialog({
                title: this.agent.name + " " + this.agent.surname,
                text: this.agent.about,
                url: window.location.href,
            })
        }
    }
}
</script>