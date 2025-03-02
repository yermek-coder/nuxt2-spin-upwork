<template>
    <v-container class="knowledge-explore">
        <div class="overflow-auto d-flex gap-4 hide-scrollbar">
            <ArticleCard v-for="(article, idx) in articles" :key="idx" :article="article" />
        </div>

        <div class="d-flex justify-space-between">
            <div class="text-h6">Videos</div>
            <NuxtLink to="#">View all</NuxtLink>
        </div>

        <div class="overflow-auto d-flex gap-4 hide-scrollbar">
            <VideoCard v-for="(video, idx) in videos" :key="idx" :video="video" />
        </div>
    </v-container>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
    route: {
        title: "Explore",
        order: 0,
    },
    data() {
        return {
            articles: knowledgeService.getArticles(),
            videos: knowledgeService.getVideos(),
        }
    }
}
</script>