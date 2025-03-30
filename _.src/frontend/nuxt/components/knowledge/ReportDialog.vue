<template>
    <v-card outlined class="d-flex flex-column rounded-xl">
        <form @submit.prevent="$emit('close', form)" class="d-flex flex-column flex-grow-1 pa-6">
            <div class="d-flex justify-center">
                <div class="flex-grow-1 text-center me-n8 subtitle-1">Report</div>
                <v-btn @click="$emit('dismiss')" class="mb-3" icon><v-icon>mdi-close</v-icon></v-btn>
            </div>
            <v-divider class="mb-6"></v-divider>
            <div class="d-flex flex-column gap-4 mb-10">
                <div class="text-body-2">Article ID: {{ entity.article_id }}</div>
                <div>
                    <div class="text-body-2 mb-2">Reason:</div>
                    <v-textarea v-model="form.reason" hide-details outlined rows="3" required placeholder="Type here..."
                        color="primary" class="rounded-xl" />
                </div>
            </div>
            <div class="d-flex">
                <v-btn type="submit" color="primary" class="flex-grow-1 elevation-0 white--text" x-large>Submit</v-btn>
            </div>
        </form>
    </v-card>
</template>

<script>
export default {
    props: { entity: Object },
    data() {
        return {
            form: {}
        }
    }
}
</script>