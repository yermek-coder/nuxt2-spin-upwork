<template>
    <div class="gradient-bg">
        <v-container class="pb-4">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <VideoThumbnail :video="video" />

            <div class="pa-2 property-card-body">
                <v-chip x-small class="mb-2 px-1">{{ video.label }}</v-chip>
                <div class="mb-2">{{ video.title }}</div>
                <div class="text--secondary text-body-4">Created Date: {{ $date(video.createdat) + " " +
                    $time(video.createdat, 'short24') }}</div>
                <div class="text--secondary text-body-4">Last modified: {{ $date(video.updatedat) + " " +
                    $time(video.updatedat, 'short24') }}</div>
            </div>
        </v-container>

        <v-sheet color="transparent" class="bottom-sheet elevation-0 mb-3" outlined>
            <v-container class="d-flex justify-center gap-5 py-2">
                <v-btn @click="remove" fab color="primary" class="elevation-0">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn :to="`/my-videos/edit/${$route.params.id}`" color="primary" fab class="elevation-0">
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
import {videoService, knowledgeService} from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "Video Preview",
    },
    data() {
        return {
            video: {},
        }
    },
    created() {
        this.init()
    },
    computed: {
        videoStatus() {
            return knowledgeService.statusMap?.[this.video?.status] || {}
        }
    },
    methods: {
        async remove() {
            const result = await videoService.removeVideo(this.video)
            if (result) {
                this.$router.push("/my-videos")
            }
        },
        async archive() {
            await videoService.archiveVideo(this.video)
            this.$router.push("/my-videos")
        },
        async init() {
            this.video = await videoService.getMyVideo(1, this.$route.params.id)
        },
    }
}
</script>