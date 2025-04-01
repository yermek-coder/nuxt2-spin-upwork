<template>
    <v-card :to="`my-videos/${video.video_id}`" rounded="xl" :class="style" class="elevation-0 video-card">
        <div class="card-image-badge rounded-sm rounded-tl-0 text-body-4 px-2" :class="videoStatus.class">
            <span :class="videoStatus.class" class="card-image-badge-decor darken-3"></span>
            {{ videoStatus.title }}
        </div>

        <VideoThumbnail :video="video" />

        <div class="pa-2 property-card-body">
            <v-chip x-small class="mb-2 px-1">{{ video.label }}</v-chip>
            <div class="mb-2">{{ video.title }}</div>
            <div class="text--secondary text-body-4">Created Date: {{ $date(video.createdat) + " " +
                $time(video.createdat, 'short24') }}</div>
            <div class="text--secondary text-body-4">Last modified: {{ $date(video.updatedat) + " " +
                $time(video.updatedat, 'short24') }}</div>
        </div>
    </v-card>
</template>

<script>
import { knowledgeService } from "@/services/knowledge"

export default {
    props: {
        video: Object,
        landscape: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        style() {
            return { "d-flex gap-3": this.landscape }
        },
        videoStatus() {
            return knowledgeService.statusMap?.[this.video?.status] || {}
        }
    },
    methods: {
        play() {
            this.$modal({component: "VideoDialog", props: {video: {src: this.video.video}}})
        }
    }
}
</script>