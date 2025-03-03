<template>
    <div class="gradient-bg">
        <v-container class="pb-4">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-img :src="article.cover" height="142px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
                class="align-end rounded-xl mt-3">
                <div class="ma-3 d-flex gap-1 flex-wrap">
                    <v-chip v-for="(tag, index) in article.tags" :key="index" x-small class="px-1">
                        {{ tag }}
                    </v-chip>
                </div>
            </v-img>

            <div class="d-flex flex-column gap-3 pa-2">
                <div class="text-h6 two-line-truncate">{{ article.title }}</div>
                <div class="d-flex gap-2 text-body-2 text--secondary">
                    <div>Last updated: {{ $date(article.updated) }}</div>
                    <v-divider vertical></v-divider>
                    <div>Last modified: {{ $date(article.modified) }}</div>
                </div>
                <div class="d-flex justify-space-between">
                    <v-chip class="text-body-3 text--secondary grey darken-3 outlined">
                        <v-icon class="text-body-2 me-1">mdi-comment-outline</v-icon>
                        <div class="me-1">{{ article.commentsCount }}</div>
                        <div>Comments</div>
                    </v-chip>
                    <v-chip class="text-body-3 text--secondary grey darken-3 outlined">
                        <v-icon class="text-body-2 me-1">mdi-thumb-up-outline</v-icon>
                        <div class="me-1">{{ article.likesCount }}</div>
                        <div>Likes</div>
                    </v-chip>
                    <v-chip class="text-body-3 text--secondary grey darken-3 outlined">
                        <v-icon class="text-body-2 me-1">mdi-share-variant-outline</v-icon>
                        <div class="me-1">{{ article.shareCount }}</div>
                        <div>Share</div>
                    </v-chip>
                </div>
            </div>

            <div class="my-3 html-content" v-html="article.content"></div>
        </v-container>

        <v-sheet color="transparent" class="bottom-sheet elevation-0" outlined>
            <v-container class="d-flex justify-center gap-5 py-2">
                <v-btn @click="remove" fab color="primary" class="elevation-0">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn :to="`/my-articles/edit/${$route.params.id}`" color="primary" fab class="elevation-0">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "Preview",
    },
    data() {
        return {
            article: knowledgeService.getMyArticle(),
        }
    },
    methods: {
        async remove() {
            const result = await this.$modal({
                component: 'ArticleDeleteDialog', contentClass: 'align-self-end mx-4', width: '100%',
                transition: "dialog-bottom-transition"
            })
            if (result) {
                this.$router.push("/my-articles")
            }
        }
    }
}
</script>