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
                <div v-if="article.label" class="d-flex flex-wrap gap-1 ma-3">
                    <v-chip x-small class="px-1">{{article.label}}</v-chip>
                </div>
            </v-img>

            <div v-if="article.createdat" class="d-flex flex-column gap-3 py-2">
                <div class="text-h6 two-line-truncate">{{ article.title }}</div>
                <div class="d-flex text--secondary text-body-2 gap-2">
                    <div>Created: {{ $date(article.createdat) }}</div>
                    <v-divider vertical></v-divider>
                    <div>Last modified: {{ $date(article.updatedat) }}</div>
                </div>
            </div>

            <Loading v-if="loading" />
            <div class="html-content my-3" v-html="article.content"></div>
        </v-container>

        <v-sheet color="transparent" class="bottom-sheet elevation-0 mb-3" outlined>
            <v-container class="d-flex justify-center gap-5 py-2">
                <v-btn @click="remove" fab color="primary" class="elevation-0">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn :to="`/my-articles/edit/${$route.params.id}`" color="primary" fab class="elevation-0">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn @click="archive" color="primary" fab class="elevation-0">
                    <v-icon>mdi-archive-arrow-down-outline</v-icon>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import {articleService} from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "Preview",
    },
    data() {
        return {
            article: {},
            loading: false
        }
    },
    created() {
        this.init()
    },
    methods: {
        async remove() {
            const result = await articleService.removeArticle(this.article)
            if (result) {
                this.$router.push("/my-articles")
            }
        },
        async archive() {
            await articleService.archiveArticle(this.article)
            this.$router.push("/my-articles")
        },
        async init() {
            this.loading = true;
            articleService.getMyArticle(1, this.$route.params.id)
                .then(result => this.article = result)
                .finally(() => this.loading = false)
        }
    }
}
</script>