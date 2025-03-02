<template>
    <v-container class="knowledge-articles">
        <div class="d-flex justify-space-between">
            <div class="text-h6">Videos</div>
            <NuxtLink to="#">View all</NuxtLink>
        </div>

        <div class="d-flex flex-column gap-4">
            <VideoCard v-for="(video, idx) in videos" :key="idx" :video="video" landscape />
        </div>
    </v-container>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
    route: {
        title: "Videos",
        order: 200,
    },
    data() {
        return {
            videos: knowledgeService.getVideos()
        }
    }
}
</script>