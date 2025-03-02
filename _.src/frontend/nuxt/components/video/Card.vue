<template>
    <v-card rounded="xl" :class="{ 'd-flex gap-3': landscape }" class="video-card elevation-0"
        :max-width="landscape ? '' : '142px'">
        <v-img :src="video.cover" height="142px" width="142px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
            class="align-end rounded-xl">
            <v-badge class="ma-2 ms-4" color="black" :content="video.duration" />
        </v-img>
        <div class="property-card-body d-flex flex-column gap-2 pa-2">
            <div class="subtitle-2 two-line-truncate">{{ video.title }}</div>
            <div class="text-body-3">{{ video.location }}</div>
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
}
</script>