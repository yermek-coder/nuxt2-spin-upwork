<template>
    <v-card @click="open" rounded="xl" :class="{ 'd-flex gap-3': landscape }" class="elevation-0 video-card"
        :max-width="landscape ? '' : '142px'">
        <v-img src="/video-preview-1.webp" height="142px" :width="landscape ? '163px' : '142px'"
            gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%" class="flex-grow-0 align-end rounded-xl">
            <v-badge class="ma-2 ms-4" color="black" :content="'7:30'" />
        </v-img>
        <div class="d-flex flex-column gap-2 pa-2 property-card-body">
            <div class="subtitle-2 two-line-truncate">{{ video.title }}</div>
            <div class="text-body-3">{{ video.user.agency }}</div>
            <ArticleAuthor :article="video" class="text-body-3" />
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        video: Object,
        landscape: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        open() {
            this.$modal({ component: 'VideoDialog', props: { video: { src: this.video.video } } })
        }
    }
}
</script>