<template>
    <div class="video-dialog">
        <v-btn @click="$emit('dismiss')" text color="white" class="me-3 mt-6"><v-icon>mdi-close</v-icon></v-btn>
        <video @click="onVideoClick" ref="videoPlayer">
            <source :src="video.src" type="video/mp4">
        </video>
    </div>
</template>

<script>
export default {
    name: 'VideoPlayer',
    props: ["video"],
    data() {
        return {
            player: null,
        }
    },
    mounted() {
        new this.$vlite(this.$refs.videoPlayer, {
            options: {
                controls: true,
                playPause: true,
                progressBar: true,
                bigPlay: true,
                time: true,
                fullscreen: false,
            },
            onReady: (player) => {
                this.player = player
            }
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.destroy()
        }
    },
    methods: {
        onVideoClick(e) {
            if (this.player.isPaused) {
                this.player.play()
            } else {
                this.player.pause()
            }
        }
    }
}
</script>
