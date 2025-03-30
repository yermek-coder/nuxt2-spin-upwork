<template>
    <div class="gradient-bg">
        <v-container class="mb-16">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-chip-group v-model="category" mandatory class="my-3">
                <v-chip v-for="item in categories" :key="item" :value="item" active-class="teal"
                    class="flex-grow-1 justify-center">
                    {{ item }}
                </v-chip>
            </v-chip-group>

            <div class="d-flex flex-wrap gap-4 my-videos-grid">
                <VideoCardAdmin v-for="video in filteredVideos" :key="video.video_id" :video="video" />
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-0" outlined>
            <v-container class="d-flex py-2">
                <v-btn to="/my-videos/edit/new" color="primary" class="flex-grow-1 elevation-0 white--text" x-large>
                    Upload New Video
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import {videoService} from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "All Videos"
    },
    data() {
        return {
            categories: ["All"],
            videos: [],
            category: ""
        }
    },
    computed: {
        filteredVideos() {
            if (this.category === 'All') {
                return this.videos
            } else {
                return this.videos.filter(video => video.label.includes(this.category))
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.videos = await videoService.getMyVideos(1);

            this.videos.forEach(video => {
                const categories = video.label.split(", ");
                if (categories.length) {
                    categories.forEach(category => !this.categories.includes(category) && this.categories.push(category))
                }
            });
        }
    }
}
</script>