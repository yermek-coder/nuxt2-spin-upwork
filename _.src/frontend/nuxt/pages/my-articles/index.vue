<template>
    <div class="gradient-bg">
        <v-container class="mb-16">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-chip-group v-model="category" mandatory class="my-3">
                <v-chip v-for="item in categories" :key="item" :value="item" active-class="teal"
                    class="flex-grow-1 justify-center">
                    {{ item }}
                </v-chip>
            </v-chip-group>

            <div class="d-flex flex-column gap-4">
                <ArticleCardAdmin v-for="article in filteredArticles" :key="article.article_id" :article="article" />
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-0" outlined>
            <v-container class="d-flex py-2">
                <v-btn to="/my-articles/edit/new" color="primary" class="elevation-0 flex-grow-1 white--text" x-large>
                    Create New Article
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import {articleService} from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "All Articles"
    },
    data() {
        return {
            categories: ["All"],
            articles: [],
            category: ""
        }
    },
    computed: {
        filteredArticles() {
            if (this.category === 'All') {
                return this.articles
            } else {
                return this.articles.filter(article => article.label.includes(this.category))
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.articles = await articleService.getMyArticles(1);

            this.articles.forEach(article => {
                const categories = article.label.split(", ");
                if (categories.length) {
                    categories.forEach(category => !this.categories.includes(category) && this.categories.push(category))
                }
            });
        }
    }
}
</script>