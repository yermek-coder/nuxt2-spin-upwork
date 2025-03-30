<template>
    <v-container class="knowledge-articles">
        <Loading v-if="loading" />
        <div v-for="category in articles" class="mb-6">
            <div class="d-flex justify-space-between mb-3">
                <div class="text-h6">{{ category.category }}</div>
                <NuxtLink to="#">View all</NuxtLink>
            </div>
            <div class="d-flex flex-column gap-3">
                <ArticleCard v-for="(article, idx) in category.articles" :key="idx" :article="article" landscape />
            </div>
        </div>
    </v-container>
</template>

<script>
import {articleService} from "@/services/knowledge"

export default {
    route: {
        title: "Articles",
        order: 100,
    },
    data() {
        return {
            articles: [],
            loading: false
        }
    },
    created() {
        this.loading = true
        articleService.getArticles().then(result => {
            this.articles = result
        }).finally(() => this.loading = false)
    }
}
</script>