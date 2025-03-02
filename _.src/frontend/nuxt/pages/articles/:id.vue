<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <div class="d-flex align-center justify-space-between gap-3 py-4">
                <Breadcrumbs />

                <div class="d-flex align-center gap-2 black--text">
                    <v-btn @click="share" icon>
                        <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-container>

        <v-container>
            <v-img :src="article.coverFull" height="201" class="rounded-xl"></v-img>
            <div class="text-h4">{{ article.title }}</div>
            <div>{{ $date(article.created, 'date_month_full') }} | {{ $time(article.created) }}</div>
            <ArticleAuthor :article="article" />

            <div v-html="article.content"></div>

            <div class="d-flex justify-space-between">
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
                title: this.agent.name + " " + this.agent.surname,
                text: this.agent.about,
                url: window.location.href,
            })
        }
    }
}
</script>