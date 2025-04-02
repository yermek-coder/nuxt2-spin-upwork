<template>
    <div class="my-articles-edit">
        <div class="pane">
            <v-form @submit.prevent="publish" class="pb-16">
                    <v-container class="pane-item">
                        <div class="d-flex align-center gap-3 py-4 breadcrumbs">
                            <v-btn @click="$router.go(-1)" icon small>
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn outlined color="primary"
                                class="rounded-lg ms-auto">Preview</v-btn>
                            </div>
                    </v-container>
                    <v-container class="mb-4">
                        <div class="rounded-xl pa-4 d-flex flex-column gap-4 mb-4 grey darken-4">
                            <div class="subtitle-1">Article Details</div>
                            <div>
                                <div class="text-body-3 font-weight-light text--secondary mb-2">Title</div>
                                <v-text-field v-model="form.title" placeholder="Title" hide-details outlined color="primary"
                                    class="rounded-xl grey darken-3" required />
                            </div>
                            <div>
                                <div class="text-body-3 font-weight-light text--secondary mb-2">Video</div>
                                <FileUploadArea v-model="form.video" type="video" maxSize="5mb"
                                    class="grey darken-3 cover-form-upload" />
                            </div>
                        </div>
                        <div class="rounded-xl pa-4 d-flex flex-column gap-3 grey darken-4">
                            <div class="subtitle-1">Category</div>
                            <div class="d-flex flex-column gap-4">
                                <v-text-field @keydown.enter.prevent v-model="q" prepend-inner-icon="mdi-magnify" placeholder="Search category" clearable hide-details outlined color="primary"
                                    class="rounded-xl grey darken-3" />
                                <div @click="toggleCategory(category.value)" v-for="category in filteredCategories"
                                    :key="category.value" :class="[{ active: isSelected(category.value) }]"
                                    class="my-articles-edit-category rounded-lg d-flex flex-grow-1 pa-4 grey darken-3">
                                    <div class="flex-grow-1">{{ category.text }}</div>
                                    <v-card :class="isSelected(category.value) ? 'primary' : 'grey darken-2'" width="24"
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
                            <v-btn type="submit" color="primary" class="elevation-0 flex-grow-1 white--text" x-large>
                                Publish
                            </v-btn>
                        </v-container>
                    </v-sheet>
                </v-form>
        </div>
    </div>
</template>

<script>
import {articleService, videoService} from "@/services/knowledge"

export default {
    layout: "dark",
    data() {
        return {
            article: {},
            form: { category: [], status: "draft", user_id: 1 },
            categories: [],
            q: ""
        }
    },
    computed: {
        isNew() {
            return this.$route.params.id === 'new'
        },
        filteredCategories() {
            if (this.q?.length) {
                return this.categories.filter(category => category.text.toLowerCase().includes(this.q.toLowerCase()))
            } else {
                return this.categories
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        toggleCategory(category) {
            if (this.isSelected(category)) {
                this.form.category = this.form.category.filter(item => item != category)
            } else {
                this.form.category.push(category.toString())
            }
        },
        isSelected(category) {
            return this.form.category.includes(category.toString())
        },
        async publish() {
            const formData = new FormData()

            for (const key in this.form) {
                const value = this.form[key];
                if (Array.isArray(value)) {
                    value.forEach(item => formData.append(`${key}[]`, item))
                } else {
                    formData.append(key, value)
                }
            }

            if (this.isNew) {
                await this.$working(videoService.createVideo(formData))
            } else {
                await this.$working(videoService.editVideo(formData))
            }

            await this.$modal({
                component: 'SuccessDialog', props: {
                    title: "Published Successfully!",
                    description: "Your video has been successfully submitted",
                },
                transition: "dialog-bottom-transition", fullscreen: true
            })
            this.$router.push("/my-videos")
        },
        async init() {
            if (!this.isNew) {
                const result = await videoService.getMyVideo(1, this.$route.params.id)
                this.article = result
                this.form = result
            }

            this.categories = await articleService.getArticleCategories()
        }
    }
}
</script>