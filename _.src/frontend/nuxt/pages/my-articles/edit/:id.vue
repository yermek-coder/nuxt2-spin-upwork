<template>
    <div class="my-articles-edit">
        <div class="pane">
            <template v-if="step === 1">
                <v-container class="pane-item">
                    <Breadcrumbs title=" ">
                        <v-btn outlined color="primary" class="rounded-lg ms-auto">Preview</v-btn>
                        <v-btn @click="step += 1" color="primary" class="ms-1 rounded-lg">Next Step</v-btn>
                    </Breadcrumbs>
                </v-container>
                <Rte v-model="article.content" ref="rte" class="pane-body pane" />
                <v-sheet class="bottom-sheet elevation-0" outlined>
                    <v-container class="d-flex py-2">
                        <div>{{ wordsCount }} words</div>
                    </v-container>
                </v-sheet>
            </template>
            <div v-else class="pb-16">
                <v-container class="pane-item">
                    <div class="d-flex align-center gap-3 py-4 breadcrumbs">
                        <v-btn @click="step -= 1" icon small>
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn outlined color="primary" class="rounded-lg ms-auto">Preview</v-btn>
                    </div>
                </v-container>
                <v-container class="mb-4">
                    <div class="rounded-xl pa-4 d-flex flex-column gap-4 mb-4 grey darken-4">
                        <div class="subtitle-1">Article Details</div>
                        <div>
                            <div class="text-body-3 font-weight-light text--secondary mb-2">Title</div>
                            <v-text-field v-model="form.title" placeholder="Title" hide-details outlined color="primary"
                                class="rounded-xl grey darken-3" />
                        </div>
                        <div>
                            <div class="text-body-3 font-weight-light text--secondary mb-2">Slugs</div>
                            <v-text-field v-model="form.slugs" placeholder="Slugs" hide-details outlined color="primary"
                                class="rounded-xl grey darken-3" />
                        </div>
                        <div>
                            <div class="text-body-3 font-weight-light text--secondary mb-2">Cover Image</div>
                            <UploadArea @change="addCover" :types="imageTypes" maxSize="5mb"
                                class="grey darken-3 cover-form-upload" />
                        </div>
                    </div>
                    <div class="rounded-xl pa-4 d-flex flex-column gap-3 grey darken-4">
                        <div class="subtitle-1">Category</div>
                        <div class="d-flex flex-column gap-4">
                            <div @click="toggleCategory(category)" v-for="category in categories" :key="category"
                                :class="[{ active: isSelected(category) }]"
                                class="my-articles-edit-category rounded-lg d-flex flex-grow-1 pa-4 grey darken-3">
                                <div class="flex-grow-1">{{ category }}</div>
                                <v-card :class="isSelected(category) ? 'primary' : 'grey darken-2'" width="24"
                                    height="24" outlined class="rounded-lg"></v-card>
                            </div>
                        </div>
                    </div>
                </v-container>

                <v-sheet class="bottom-sheet elevation-0" outlined>
                    <v-container class="d-flex gap-3 py-2">
                        <v-btn text class="teal--text flex-grow-1 text--lighten-2" x-large>
                            Save Draft
                        </v-btn>
                        <v-btn @click="publish" color="primary" class="elevation-0 flex-grow-1 white--text" x-large>
                            Publish
                        </v-btn>
                    </v-container>
                </v-sheet>
            </div>
        </div>
    </div>
</template>

<script>
import { IMAGE_TYPES } from '~/util'
import knowledgeService from "@/services/knowledge"

const slugArticle = {
    content: "",
}

export default {
    layout: "dark",
    data() {
        return {
            article: this.$route.params.id === 'new' ? slugArticle : knowledgeService.getMyArticle(),
            step: 1,
            form: { categories: [] },
            categories: [
                "Buying",
                "Selling",
                "Renting",
                "Home Financing",
                "Legal & Tax",
                "Home Improvement",
                "Property Insights",
                "Your Home Journeys",
            ],
            imageTypes: IMAGE_TYPES,
        }
    },
    computed: {
        wordsCount() {
            if (process.client) {
                return (this.article?.content || "")
                    .replace(/<[^>]*>/g, " ")
                    .replace(/\s+/g, ' ')
                    .trim()
                    .split(" ").length
            }
        }
    },
    methods: {
        addCover(event) {
            this.form.cover = event.target.files[0]
        },
        toggleCategory(category) {
            if (this.isSelected(category)) {
                this.form.categories = this.form.categories.filter(item => item !== category)
            } else {
                this.form.categories.push(category)
            }
        },
        isSelected(category) {
            return this.form.categories.includes(category)
        },
        async publish() {
            await this.$modal({
                component: 'ArticlePublishedDialog', contentClass: 'align-self-end mx-4', width: '100%',
                transition: "dialog-bottom-transition"
            })
            this.$router.push("/my-articles")
        }
    }
}
</script>