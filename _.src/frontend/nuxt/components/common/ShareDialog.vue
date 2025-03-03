<template>
    <v-card class="rounded-xl pb-4">
        <div class="d-flex py-3 pe-3 ps-12">
            <div class="text-h5 text-center flex-grow-1">Share</div>
            <v-btn @click="$emit('dismiss')" icon><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider></v-divider>
        <div class="d-flex px-12 py-8 justify-space-between">
            <v-icon v-for="icon in icons" :key="icon">mdi-{{ icon }}</v-icon>
        </div>
        <v-sheet outlined class="px-4 py-2 rounded-xl d-flex gap-3 align-center flex-shrink-1 mx-5 mb-8">
            <div class="text-truncate">{{ link }}</div>
            <v-btn icon><v-icon>mdi-content-copy</v-icon></v-btn>
        </v-sheet>
        <div class="d-flex px-4">
            <v-btn color="primary" x-large class="white--text elevation-0 flex-grow-1">Share Now</v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ["link"],
    data() {
        return {
            icons: [
                "facebook",
                "whatsapp",
                "email",
                "twitter",
                "send",
                "chat-processing-outline",
                "link",
            ]
        }
    }
}
</script>