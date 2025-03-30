<template>
    <v-card :to="`my-videos/${video.video_id}`" rounded="xl" :class="style" class="elevation-0 video-card">
        <div class="card-image-badge rounded-sm rounded-tl-0 text-body-4 px-2" :class="videoStatus.class">
            <span :class="videoStatus.class" class="card-image-badge-decor darken-3"></span>
            {{ videoStatus.title }}
        </div>
        <v-img src="/video-preview-1.webp" height="168px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
            class="flex-grow-0 align-end rounded-xl">
            <v-badge class="ma-2 ms-4" color="black" :content="'7:30'" />
            <button @click.prevent="play" class="video-card-btn-play px-2 py-1 rounded-xl d-flex">
                <v-icon class="text-h3">mdi-play-circle-outline</v-icon>
            </button>
        </v-img>
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