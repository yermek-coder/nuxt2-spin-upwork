<template>
    <div>
        <v-container class="mb-3 pb-0 white">
            <Breadcrumbs title="Article Details" parent="/knowledge">
                <v-btn @click="share" icon>
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
                <v-btn @click="report" icon>
                    <v-icon>mdi-message-alert-outline</v-icon>
                </v-btn>
            </Breadcrumbs>
        </v-container>

        <v-container>
            <v-img :src="article.cover_image" height="201" class="rounded-xl mb-4"></v-img>
            <div class="text-h4 mb-3">{{ article.title }}</div>
            <div class="mb-2">{{ $date(article.createdat, 'date_month_full') }} | {{ $time(article.createdat) }}</div>
            <ArticleAuthor :article="article" class="mb-4" />

            <div v-html="article.content" class="html-content mb-4"></div>

            <template v-if="article.recommended && article.recommended.length">
                <div class="d-flex justify-space-between mb-3">
                    <div class="text-h6">You may interest</div>
                    <NuxtLink to="#">View all</NuxtLink>
                </div>
                <div class="d-flex gap-4 hide-scrollbar overflow-auto">
                    <ArticleCard v-for="(recommended) in article.recommended" :key="recommended.article_id"
                        :article="recommended" />
                </div>
            </template>
        </v-container>
    </div>
</template>

<script>
import shareService from '~/services/share';
import {articleService, knowledgeService} from "@/services/knowledge"

export default {
    data() {
        return {
            article: {}
        }
    },
    created() {
        articleService.getArticle(this.$route.params.id).then(result => this.article = result)
    },
    methods: {
        share() {
            shareService.showShareDialog({
                title: this.article.name + " " + this.article.surname,
                text: this.article.about,
                url: window.location.href,
            })
        },
        async report() {
            const result = await knowledgeService.report(this.article);
            if (result) {
                await this.$modal({ component: "SuccessDialog", props: { title: "Reported!", description: "Thank you!" } })
            }
        },
    }
}
</script>