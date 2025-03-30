<template>
    <v-card :to="`/my-articles/${article.article_id}`" rounded="xl" class="article-card elevation-0">
        <div class="card-image-badge rounded-sm rounded-tl-0 text-body-4 px-2" :class="articleStatus.class">
            <span :class="articleStatus.class" class="card-image-badge-decor darken-3"></span>
            {{ articleStatus.title }}
        </div>
        <v-img :src="article.cover" height="142px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
            class="align-end rounded-xl">
            <div class="d-flex flex-wrap gap-1 ma-3">
                <v-chip x-small class="px-1">{{ article.label }}</v-chip>
            </div>
        </v-img>

        <div class="d-flex flex-column gap-3 pa-2 property-card-body">
            <div class="subtitle-2 two-line-truncate">{{ article.title }}</div>
            <div class="d-flex text--secondary text-body-2 gap-2">
                <div>Created: {{ $date(article.createdat) }}</div>
                <v-divider vertical></v-divider>
                <div>Last modified: {{ $date(article.updatedat) }}</div>
            </div>
            <div class="d-flex justify-space-between">
                <v-chip class="text--secondary text-body-3 darken-3 grey outlined">
                    <v-icon class="text-body-2 me-1">mdi-comment-outline</v-icon>
                    <div class="me-1">{{ article.comments_count }}</div>
                    <div>Comments</div>
                </v-chip>
                <v-chip class="text--secondary text-body-3 darken-3 grey outlined">
                    <v-icon class="text-body-2 me-1">mdi-thumb-up-outline</v-icon>
                    <div class="me-1">{{ article.likes_count }}</div>
                    <div>Likes</div>
                </v-chip>
                <v-chip class="text--secondary text-body-3 darken-3 grey outlined">
                    <v-icon class="text-body-2 me-1">mdi-share-variant-outline</v-icon>
                    <div class="me-1">{{ article.share_count }}</div>
                    <div>Share</div>
                </v-chip>
            </div>
        </div>
    </v-card>
</template>

<script>
import { knowledgeService } from "@/services/knowledge"

export default {
    props: {
        article: Object,
    },
    computed: {
        articleStatus() {
            return knowledgeService.statusMap?.[this.article?.status] || {}
        }
    }
}
</script>