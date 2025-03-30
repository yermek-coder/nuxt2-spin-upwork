<template>
    <v-card outlined class="d-flex flex-column rounded-xl">
        <div class="d-flex flex-column flex-grow-1 pa-6">
            <div class="d-flex justify-center">
                <div class="flex-grow-1 text-center me-n8 subtitle-1">Delete</div>
                <v-btn @click="$emit('dismiss')" class="mb-3" icon><v-icon>mdi-close</v-icon></v-btn>
            </div>
            <v-divider class="mb-6"></v-divider>
            <div class="d-flex flex-column align-center gap-5 mb-6">
                <img src="/decorations/trash.svg" width="121" height="106"></img>
                <div class="text-body-2 text-center px-6">{{ description }}</div>
            </div>
            <div class="d-flex gap-3">
                <v-btn @click="$emit('dismiss')" text class="flex-grow-1 text--lighten-2 teal--text" x-large>
                    Cancel
                </v-btn>
                <v-btn @click="$emit('close', true)" color="primary" class="flex-grow-1 elevation-0 white--text"
                    x-large>
                    Delete
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        description: String,
    }
}
</script>
