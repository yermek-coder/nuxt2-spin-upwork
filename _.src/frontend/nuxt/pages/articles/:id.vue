<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs>
                <v-btn @click="share" icon>
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
            </Breadcrumbs>
        </v-container>

        <v-container>
            <v-img :src="article.coverFull" height="201" class="rounded-xl mb-4"></v-img>
            <div class="text-h4 mb-3">{{ article.title }}</div>
            <div class="mb-2">{{ $date(article.created, 'date_month_full') }} | {{ $time(article.created) }}</div>
            <ArticleAuthor :article="article" class="mb-4" />

            <div v-html="article.content" class="mb-4 html-content"></div>

            <div class="d-flex justify-space-between mb-3">
                <div class="text-h6">{{ article.category }}</div>
                <NuxtLink to="#">View all</NuxtLink>
            </div>
            <div class="overflow-auto d-flex gap-4 hide-scrollbar">
                <ArticleCard v-for="(article, idx) in articles" :key="idx" :article="article" />
            </div>
        </v-container>
    </div>
</template>

<script>
import shareService from '~/services/share';
import knowledgeService from "@/services/knowledge"

export default {
    route: {
        title: "Article Details"
    },
    data() {
        return {
            articles: knowledgeService.getArticles(),
            article: knowledgeService.getArticle(this.$route.params.id)
        }
    },
    methods: {
        share() {
            shareService.showShareDialog({
                title: this.article.name + " " + this.article.surname,
                text: this.article.about,
                url: window.location.href,
            })
        }
    }
}
</script>