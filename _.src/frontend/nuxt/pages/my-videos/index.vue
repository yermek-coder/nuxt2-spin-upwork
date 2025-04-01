<template>
    <div class="gradient-bg">
        <v-container class="mb-16">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-chip-group v-model="category" mandatory class="my-3">
                <v-chip v-for="item in categories" :key="item.value" :value="item.value" active-class="teal"
                    class="flex-grow-1 justify-center text-capitalize">
                    {{ item.text }}
                </v-chip>
            </v-chip-group>

            <v-row>
                <v-col v-for="video in filteredVideos" :key="video.video_id" cols="6">
                    <VideoCardAdmin :video="video" />
                </v-col>
            </v-row>
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
import {videoService, knowledgeService} from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "All Videos"
    },
    data() {
        return {
            categories: [{text: "All", value: 'all'}, ...Object.keys(knowledgeService.statusMap).map(key => ({
                value: key, text: knowledgeService.statusMap[key].title
            }))],
            videos: [],
            category: ""
        }
    },
    computed: {
        filteredVideos() {
            if (this.category === 'all') {
                return this.videos
            } else {
                return this.videos.filter(article => article.status === this.category)
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.videos = await videoService.getMyVideos(1);
        }
    }
}
</script>