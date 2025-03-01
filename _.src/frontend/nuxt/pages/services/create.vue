<template>
    <div class="services-create pb-16">
        <div class="white">
            <v-container class="pt-5 pb-0">
                <Breadcrumbs />
            </v-container>
        </div>

        <v-container>
            <div class="white rounded-xl pa-4 d-flex flex-column gap-3">
                <div class="text-h7 font-weight-medium mb-2">Service Catergory</div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Category</div>
                    <v-select v-model="form.category" :items="categories" hide-details outlined color="teal lighten-1"
                        class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Sub Category</div>
                    <v-select v-model="form.subCategory" :items="categories" hide-details outlined
                        color="teal lighten-1" class="rounded-xl" />
                </div>
            </div>
        </v-container>
        <v-container>
            <div class="white rounded-xl pa-4 d-flex flex-column gap-3">
                <div class="text-h7 font-weight-medium mb-2">Thumbnail</div>
                <v-card outlined class="rounded-xl d-flex gap-3 py-12 align-center justify-center form-upload">
                    <Icon icon="image" />
                    <div class="d-flex gap-1 flex-column justify-center">
                        <div class="text-body-2">
                            <span class="teal--text">Upload</span> your document
                        </div>
                        <div class="text--secondary text-body-3">
                            Maximum size 5MB
                        </div>
                    </div>
                    <input ref="thumbnailInput" @cancel.stop @change="addThumbnail" :accept="imageTypes" type="file" />
                </v-card>
            </div>
        </v-container>
        <v-container>
            <div class="white rounded-xl pa-4 d-flex flex-column gap-3">
                <div class="text-h7 font-weight-medium mb-2">Service Gallery ({{ previews.length }}/10)</div>
                <v-img src="/decorations/upload-bg.svg" class="d-flex gap-3 align-center justify-center form-upload">
                    <div class="d-flex gap-3 align-center justify-center">
                        <Icon icon="image2" />
                        <div class="d-flex gap-1 flex-column justify-center">
                            <div class="text-body-2">
                                Upload your image
                            </div>
                            <div class="text--secondary text-body-3">
                                Maximum size 5MB
                            </div>
                        </div>
                    </div>
                    <input ref="galleryInput" @cancel.stop @change="addPhoto" :accept="imageTypes" type="file"
                        multiple />
                </v-img>
                <div class="d-flex gap-3 overflow-auto">
                    <v-img src="/decorations/upload-bg-2.svg" height="66" width="70" max-width="70"
                        class="d-flex align-center justify-center form-upload">
                        <div class="d-flex align-center justify-center">
                            <v-icon class="teal--text">mdi-plus</v-icon>
                        </div>
                        <input ref="galleryInput" @cancel.stop @change="addPhoto" :accept="imageTypes" type="file"
                            multiple />
                    </v-img>
                    <ClientOnly>
                        <div class="d-flex gap-3">
                            <div v-for="(src, idx) in previews" :key="idx">
                                <v-img :src="src" height="66" width="70" class="rounded-xl">
                                    <div class="d-flex justify-end me-2 mt-2">
                                        <v-btn @click="removeImage(idx)" fab x-small color="black" class="white--text"
                                            max-height="18" max-width="18">
                                            <v-icon class="text-body-3">mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                </v-img>
                            </div>
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </v-container>
        <v-container class="mb-3">
            <div class="white rounded-xl pa-4 d-flex flex-column gap-3">
                <div class="text-h7 font-weight-medium mb-2">Details</div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Company Name</div>
                    <v-text-field v-model="form.name" hide-details outlined color="teal lighten-1" class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Company Register Number</div>
                    <v-text-field v-model="form.registerNumber" hide-details outlined color="teal lighten-1"
                        class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Price</div>
                    <v-text-field v-model="form.price" type="number" hide-details outlined color="teal lighten-1"
                        class="rounded-xl services-create-price-field">
                        <template #prepend-inner>
                            <div class="d-flex gap-2 align-center ms-1 black--text">
                                <span class="text--secondary">RM</span>
                                <v-divider vertical></v-divider>
                            </div>
                        </template>
                        <template #append>
                            <div class="pa-1 d-flex grey lighten-4 rounded-xl">
                                <v-chip @click="form.priceMode = 'hourly'"
                                    :class="form.priceMode === 'hourly' ? 'white' : 'grey lighten-4'" class="pa-2"
                                    small>Hour</v-chip>
                                <v-chip @click="form.priceMode = 'fixed'"
                                    :class="form.priceMode === 'fixed' ? 'white' : 'grey lighten-4'" class="pa-2"
                                    small>Fixed</v-chip>
                            </div>
                        </template>
                    </v-text-field>
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Descriptions</div>
                    <v-textarea v-model="form.descriptions" hide-details outlined rows="3" color="teal lighten-1"
                        class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Whatsapp Number</div>
                    <PhoneField v-model="form.whatsapp" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Phone Number</div>
                    <PhoneField v-model="form.phone" />
                </div>
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="d-flex">
                <v-btn class="elevation-0 flex-grow-1 teal lighten-2 white--text" x-large><v-icon>mdi-plus</v-icon>
                    <div class="ms-4">Create</div>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
export default {
    route: {
        title: "New Service",
    },
    data() {
        return {
            categories: ["Gardener"],
            form: {
                category: "Gardener",
                subCategory: "Gardener",
                name: "",
                registerNumber: null,
                price: null,
                priceMode: "hourly",
                descriptions: "",
                whatsapp: "",
                phone: "",
                thumbnail: null,
                gallery: [],
            },
            imageTypes: ["image/bmp", "image/jpeg", "image/png", "image/webp"],
            previews: []
        }
    },
    watch: {
        'form.gallery': {
            handler(gallery) {
                Promise.all(
                    gallery.map(file => new Promise((resolve) => {
                        const fr = new FileReader()
                        fr.readAsDataURL(file)
                        fr.onload = event => {
                            resolve(event.target.result);
                        }
                    }))
                ).then(result => this.previews = result)
            }
        }
    },
    methods: {
        addThumbnail(event) {
            this.form.thumbnail = event.target.files[0]
        },
        addPhoto(event) {
            this.form.gallery.push(...Array.from(event.target.files))
        },
        removeImage(idx) {
            this.form.gallery.splice(idx, 1)
        }
    }
}
</script>