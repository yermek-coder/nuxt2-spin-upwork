<template>
    <div class="gradient-bg">
        <v-container class="mb-16">
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-chip-group mandatory class="my-3">
                <v-chip v-for="item in states" :key="item" :value="item" active-class="teal"
                    class="flex-grow-1 justify-center">
                    {{ item }}
                </v-chip>
            </v-chip-group>

            <div class="d-flex flex-column gap-4">
                <ArticleCardAdmin v-for="(article, idx) in articles" :key="idx" :article="article" />
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
import knowledgeService from "@/services/knowledge"

export default {
    layout: "dark",
    route: {
        title: "Article"
    },
    data() {
        return {
            states: [
                "All",
                "Cleaner",
                "Plumber",
                "Electrica",
            ],
            articles: knowledgeService.getMyArticles(),
        }
    }
}
</script>