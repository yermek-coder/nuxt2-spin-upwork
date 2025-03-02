<template>
    <v-card :to="`/my-articles/${article.id}`" rounded="xl" class="article-card elevation-0 pb-16">
        <div class="card-image-badge px-2 text-body-4 rounded-sm rounded-tl-0" :class="stateMap[article.state].class">
            <span :class="stateMap[article.state].class" class="card-image-badge-decor darken-3"></span>
            {{ stateMap[article.state].title }}
        </div>
        <v-img :src="article.cover" height="142px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
            class="align-end rounded-xl">
            <div class="px-2 d-flex gap-1 flex-wrap">
                <v-chip v-for="(tag, index) in article.tags" :key="index" x-small outlined class="px-1">
                    {{ tag }}
                </v-chip>
            </div>
        </v-img>

        <div class="property-card-body d-flex flex-column gap-3 pa-2">
            <div class="subtitle-2 two-line-truncate">{{ article.title }}</div>
            <div class="d-flex gap-2 text-body-2 text--secondary">
                <div>Last updated: {{ $date(article.updated) }}</div>
                <v-divider vertical></v-divider>
                <div>Last modified: {{ $date(article.modified) }}</div>
            </div>
            <div class="d-flex justify-space-between">
                <v-chip class="text-body-3 text--secondary" outlined>
                    <v-icon class="text-body-2 me-1">mdi-comment-outline</v-icon>
                    <div class="me-1">{{ article.commentsCount }}</div>
                    <div>Comments</div>
                </v-chip>
                <v-chip class="text-body-3 text--secondary" outlined>
                    <v-icon class="text-body-2 me-1">mdi-thumb-up-outline</v-icon>
                    <div class="me-1">{{ article.likesCount }}</div>
                    <div>Likes</div>
                </v-chip>
                <v-chip class="text-body-3 text--secondary" outlined>
                    <v-icon class="text-body-2 me-1">mdi-share-variant-outline</v-icon>
                    <div class="me-1">{{ article.shareCount }}</div>
                    <div>Share</div>
                </v-chip>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        article: Object,
    },
    data() {
        return {
            stateMap: {
                published: {
                    title: "Published",
                    class: "teal white--text",
                },
                archived: {
                    title: "Highlight",
                    class: "grey lighten-3",
                },
                pending: {
                    title: "Pending Review",
                    class: "amber lighten-3",
                },
            }
        }
    },
}
</script>