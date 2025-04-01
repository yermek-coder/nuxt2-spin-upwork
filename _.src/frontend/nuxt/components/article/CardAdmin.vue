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
            <div class="d-flex text--secondary text-body-4 gap-2">
                <div>Created Date: {{ $date(article.createdat) }} {{ $time(article.createdat, 'short24') }}</div>
                <v-divider vertical></v-divider>
                <div>Last modified: {{ $date(article.updatedat) }} {{ $time(article.updatedat, 'short24') }}</div>
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