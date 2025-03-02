<template>
    <div>
        <DarkTheme />
        <v-container class="mb-3">
            <Breadcrumbs class="my-4">
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-chip-group mandatory>
                <v-chip v-for="item in states" :key="item" :value="item" active-class="teal"
                    class="flex-grow-1 justify-center">
                    {{ item }}
                </v-chip>
            </v-chip-group>

            <div class="d-flex flex-column gap-3">
                <ArticleCardAdmin v-for="(article, idx) in articles" :key="idx" :article="article" />
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="d-flex">
                <v-btn class="elevation-0 flex-grow-1 teal lighten-2 white--text" x-large>
                    <div class="ms-4">Create New Article</div>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
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