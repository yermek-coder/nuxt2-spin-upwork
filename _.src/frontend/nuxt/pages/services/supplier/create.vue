<template>
    <div>
        <div class="white">
            <v-container class="pt-5 pb-0">
                <Breadcrumbs />
            </v-container>
        </div>

        <v-container class="pb-16">
            <div class="white rounded-xl pa-4 d-flex flex-column gap-3 mb-8">
                <div class="text-h7 font-weight-medium mb-2">Personal Information</div>
                <div class="d-flex gap-4 align-center">
                    <v-avatar color="teal lighten-5" size="64">
                        <v-icon class="text-h4">mdi-account</v-icon>
                    </v-avatar>
                    <div class="d-flex flex-column flex-grow-1">
                        <div>Profile Picture</div>
                        <div class="text-body-2 font-weight-light text--secondary">Max 1Mb</div>
                    </div>
                    <div class="d-flex align-center">
                        <v-btn color="teal" outlined class="form-upload">
                            Upload
                            <input @cancel.stop @change="addProfilePhoto" :accept="imageTypes" type="file" />
                        </v-btn>
                    </div>
                </div>
                <div class="d-flex gap-4 align-center">
                    <v-avatar color="teal lighten-5" size="64">
                        <v-icon class="text-h4">mdi-account</v-icon>
                    </v-avatar>
                    <div class="d-flex flex-column flex-grow-1">
                        <div>Cover Photo</div>
                        <div class="text-body-2 font-weight-light text--secondary">Max 1Mb</div>
                    </div>
                    <div class="d-flex align-center">
                        <v-btn color="teal" outlined class="form-upload">
                            Upload
                            <input @cancel.stop @change="addCoverPhoto" :accept="imageTypes" type="file" />
                        </v-btn>
                    </div>
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Name per PIC <span
                            class="red--text">*</span></div>
                    <v-text-field v-model="form.name" hide-details outlined color="teal lighten-1" class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Company Name <span
                            class="red--text">*</span></div>
                    <v-text-field v-model="form.companyName" hide-details outlined color="teal lighten-1"
                        class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Company Phone</div>
                    <PhoneField v-model="form.phone" />
                </div>
                <div>
                    <v-text-field v-model="form.verify" hide-details outlined color="teal lighten-1" class="rounded-xl">
                        <template #append>
                            <span class="teal--text">Verify</span>
                        </template>
                    </v-text-field>
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Email <span
                            class="red--text">*</span></div>
                    <v-text-field v-model="form.email" placeholder="email@example.com" hide-details outlined
                        color="teal lighten-1" class="rounded-xl" />
                </div>
                <div>
                    <div class="text-body-3 font-weight-light text--secondary mb-1">Description more about yourself
                    </div>
                    <v-textarea v-model="form.descriptions" hide-details outlined rows="3" color="teal lighten-1"
                        class="rounded-xl" />
                </div>
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="d-flex">
                <v-btn class="elevation-0 flex-grow-1 teal lighten-2 white--text" x-large><v-icon>mdi-plus</v-icon>
                    <div class="ms-4">Submit</div>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
export default {
    route: {
        title: "Application"
    },
    data() {
        return {
            imageTypes: ["image/bmp", "image/jpeg", "image/png", "image/webp"],
            form: {
                profilePhoto: null,
                coverPhoto: null
            }
        }
    },
    methods: {
        addProfilePhoto(event) {
            this.form.profilePhoto = event.target.files[0]
        },
        addCoverPhoto(event) {
            this.form.coverPhoto = event.target.files[0]
        }
    }
}
</script>