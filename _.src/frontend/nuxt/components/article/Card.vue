<template>
    <v-card :to="`/articles/${article.id}`" rounded="xl" :class="{ 'd-flex gap-3': landscape }"
        :max-width="landscape ? '' : '142px'" class="article-card elevation-0">
        <v-img :src="article.cover" height="142px" width="142px"
            gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%" class="align-end rounded-xl">
            <v-chip x-small class="ma-2">{{ article.minutesRead }} min read</v-chip>
        </v-img>
        <div class="property-card-body d-flex flex-column gap-2 pa-2">
            <div class="subtitle-2 two-line-truncate">{{ article.title }}</div>
            <div class="text-body-3 mt-auto">{{ article.location }}</div>
            <ArticleAuthor :article="article" class="text-body-3" />
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        article: Object,
        landscape: {
            type: Boolean,
            default: false
        }
    },
}
</script>