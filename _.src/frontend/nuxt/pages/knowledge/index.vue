<template>
    <v-container class="knowledge-explore">
        <Loading v-if="loading" />

        <div class="overflow-auto d-flex gap-4 hide-scrollbar mb-6">
            <ArticleCard v-for="(article, idx) in explore.articles" :key="idx" :article="article" />
        </div>

        <template v-if="explore.videos.length">
            <div class="d-flex justify-space-between mb-3">
                <div class="text-h6">Videos</div>
                <NuxtLink to="#">View all</NuxtLink>
            </div>
            <div class="overflow-auto d-flex gap-4 hide-scrollbar">
                <VideoCard v-for="(video, idx) in explore.videos" :key="idx" :video="video" />
            </div>
        </template>
    </v-container>
</template>

<script>
import {knowledgeService} from "@/services/knowledge"

export default {
    data() {
        return {
            explore: { articles: [], videos: [] },
            loading: false
        }
    },
    route: {
        title: "Explore",
        order: 0,
    },
    created() {
        this.loading = true
        knowledgeService.getExplore().then(result => {
            this.explore = result
        }).finally(() => this.loading = false)
    }
}
</script>