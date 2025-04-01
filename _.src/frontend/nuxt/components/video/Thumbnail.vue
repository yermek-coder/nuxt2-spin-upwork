<template>
    <div class="video-card-thumbnail">
        <video v-if="video.video" ref="video" @loadedmetadata="onLoad" height="100%" width="100%" preload="metadata" muted>
            <source :src="`${video.video}#t=0.1`" type="video/mp4">
        </video>
        <v-badge class="ma-2 ms-4" color="black" :content="duration" />
        <button @click.prevent="play" class="video-card-btn-play px-2 py-1 rounded-xl d-flex">
            <v-icon class="text-h3">mdi-play-circle-outline</v-icon>
        </button>
    </div>
</template>

<script>
import {videoService} from "~/services/knowledge"

export default {
    props: ["video"],
    data() {
        return {
            duration: '00:00',
        }
    },
    methods: {
        onLoad(event) {
            this.duration = videoService.formatDuration(event.target?.duration || 0);
        },
        play() {
            this.$modal({component: "VideoDialog", props: {video: {src: this.video.video}}})
        }
    },
}
</script>