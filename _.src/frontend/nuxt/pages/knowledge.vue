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

        <Carousel height="304">
            <v-carousel-item v-for="(article, idx) in slides" :key="idx" class="px-3">
                <v-img :src="article.cover" class="align-end rounded-xl" height="304"
                    gradient="to top, rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.6) 155px, rgba(0, 0, 0, 0) 206px">
                    <div class="pa-4 d-flex flex-column gap-2">
                        <div class="d-flex gap-1">
                            <v-chip v-for="tag in article.tags" :key="tag" small>{{ tag }}</v-chip>
                        </div>
                        <div class="white--text d-flex flex-column gap-2">
                            <div class="text-h6 font-weight-bold">{{ article.title }}</div>
                            <div>{{ article.location }}</div>
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
export default {
    route: {
        title: "News"
    },
    data() {
        return {
            slides: Array(4).fill({
                cover: "/article-cover.webp",
                tags: ["Trending"],
                title: "OPR In Malaysia: How It Affects You",
                location: "Sunway Velocity, KL",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.webp"
                }
            }),
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
        Promise.all((this.$routes.find(page => page.path === "/knowledge")?.children || []).map(async page => {
            return ({ ...page, component: await page.component() })
        })).then(pages => {
            this.tabs = pages
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: component.route.title, path, name }))
        })
    },
}
</script>