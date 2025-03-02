<template>
    <div>
        <DarkTheme />
        <v-container class="pb-4">
            <!-- <div class="d-flex align-center gap-3 py-4">
                <v-btn @click="$router.go(-1)" icon small>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <h4 class="text-uppercase flex-grow-1">Preview</h4>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </div> -->
            <Breadcrumbs class="my-4">
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <v-img :src="article.cover" height="142px" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
                class="align-end rounded-xl">
                <div class="px-2 d-flex gap-1 flex-wrap">
                    <v-chip v-for="(tag, index) in article.tags" :key="index" x-small outlined class="px-1">
                        {{ tag }}
                    </v-chip>
                </div>
            </v-img>

            <div class="d-flex flex-column gap-3 pa-2">
                <div class="text-h6 two-line-truncate">{{ article.title }}</div>
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

            <div v-html="article.content"></div>
        </v-container>

        <v-sheet color="transparent" class="bottom-sheet elevation-10">
            <v-container class="d-flex justify-center gap-5">
                <v-btn fab class="elevation-0 teal lighten-2">
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn :to="`/my-articles/edit/${$route.params.id}`" fab class="elevation-0 teal lighten-2">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import knowledgeService from "@/services/knowledge"

export default {
    route: {
        title: "Preview",
    },
    data() {
        return {
            article: knowledgeService.getMyArticle(),
        }
    }
}
</script>