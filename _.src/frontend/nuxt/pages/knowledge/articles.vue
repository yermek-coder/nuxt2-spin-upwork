<template>
    <v-container class="knowledge-articles">
        <div v-for="category in categories" class="mb-6">
            <div class="d-flex justify-space-between mb-3">
                <div class="text-h6">{{ category.title }}</div>
                <NuxtLink to="#">View all</NuxtLink>
            </div>
            <div class="d-flex flex-column gap-3">
                <ArticleCard v-for="(article, idx) in category.articles" :key="idx" :article="article" landscape />
            </div>
        </div>
    </v-container>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
    route: {
        title: "Articles",
        order: 100,
    },
    data() {
        return {
            categories: [
                {
                    title: "Finance",
                    articles: knowledgeService.getArticles()
                },
                {
                    title: "Properties",
                    articles: knowledgeService.getArticles()
                },
            ]
        }
    }
}
</script>