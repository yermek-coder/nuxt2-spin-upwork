<template>
    <v-container class="knowledge-articles">
        <div v-for="category in videos" class="mb-6">
            <div class="d-flex justify-space-between mb-3">
                <div class="text-h6">{{ category.category }}</div>
                <NuxtLink to="#">View all</NuxtLink>
            </div>
            <div class="d-flex flex-column gap-3">
                <VideoCard v-for="(video, idx) in category.videos" :key="idx" :video="video" landscape />
            </div>
        </div>
    </v-container>
</template>

<script>
import {videoService} from "@/services/knowledge"

export default {
    route: {
        title: "Videos",
        order: 200,
    },
    data() {
        return {
            videos: []
        }
    },
    created() {
        videoService.getVideos().then(result => {
            this.videos = result
        })
    }
}
</script>