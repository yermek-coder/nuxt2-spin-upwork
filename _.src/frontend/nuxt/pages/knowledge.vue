<template>
    <div class="knowledge">
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs title="News" />
        </v-container>

        <v-container>
            <v-text-field placeholder="Search here" outlined clearable hide-details clear-icon="mdi-close-circle"
                color="primary" class="rounded-xl property-search mb-3">
                <template #prepend-inner>
                    <v-icon>mdi-magnify</v-icon>
                </template>
            </v-text-field>
        </v-container>

        <Carousel v-if="slides.length" height="304">
            <v-carousel-item v-for="article in slides" :key="article.article_id" :to="`/articles/${article.slug}`" class="px-3">
                <v-img :src="article.cover_image" class="align-end rounded-xl" height="304"
                    gradient="to top, rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.6) 155px, rgba(0, 0, 0, 0) 206px">
                    <div class="pa-4 d-flex flex-column gap-2">
                        <div class="d-flex gap-1">
                            <v-chip small>{{ article.label }}</v-chip>
                        </div>
                        <div class="white--text d-flex flex-column gap-2">
                            <div class="text-h6 font-weight-bold">{{ article.title }}</div>
                            <div>{{ article.user.agency }}</div>
                            <div class="d-flex gap-3 align-center">
                                <ArticleAuthor :article="article" class="flex-grow-1" />
                                <v-btn icon>
                                    <Icon icon="arrow-up-right" />
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-img>
            </v-carousel-item>
        </Carousel>

        <v-container>
            <div class="white pa-4 rounded-xl">
                <div class="d-flex gap-3 align-center">
                    <div>
                        <Icon icon="shield-check-2" />
                        <div class="text-body-3 font-weight-bold">House Buying Guide</div>
                    </div>
                    <div v-for="step in steps" class="d-flex gap-3 flex-column align-center">
                        <Icon :icon="step.icon" />
                        <div class="text-body-6 text-center">{{ step.title }}</div>
                    </div>
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="d-flex gap-3 chip-tab-navigation">
                <v-chip v-for="item in tabs" :key="item.path" :to="{ name: item.name }"
                    exact-active-class="v-chip--exact-active teal--text" class="flex-grow-1 justify-center">
                    {{ item.title }}
                </v-chip>
            </div>
        </v-container>

        <NuxtChild />
    </div>
</template>

<script>
import {knowledgeService} from '~/services/knowledge'

export default {
    route: {
        title: "News"
    },
    data() {
        return {
            slides: [],
            steps: [
                { title: "Pre-purchase", icon: "calendar" },
                { title: "Select Property", icon: "property" },
                { title: "Contract Signing", icon: "contract" },
                { title: "Mortgage Proposal", icon: "wallet" },
                { title: "Payment Transfer", icon: "payment" },
                { title: "Propert Handover", icon: "check2" },
            ],
            tabs: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            const pages = await Promise.all((this.$routes.find(page => page.path === "/knowledge")?.children || [])
                .map(async page => ({ ...page, component: await page.component() })))

            this.tabs = pages
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: component.route.title, path, name }))

            this.slides = await knowledgeService.getFeatured()
        }
    }
}
</script>