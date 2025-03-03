<template>
    <v-card outlined class="rounded-xl d-flex flex-column">
        <div class="d-flex flex-column flex-grow-1 pa-6">
            <div class="d-flex justify-center">
                <div class="subtitle-1 flex-grow-1 me-n8 text-center">Successfully</div>
                <v-btn @click="$emit('dismiss')" class="mb-3" icon><v-icon>mdi-close</v-icon></v-btn>
            </div>
            <v-divider class="mb-6"></v-divider>
            <div class="d-flex flex-column align-center gap-5 mb-6">
                <img src="/decorations/success.svg" width="121" height="106"></img>
                <div class="text-body-2 text-center px-6">Your article has been successfully published</div>
            </div>
            <div class="d-flex">
                <v-btn @click="$emit('dismiss')" color="primary" class="elevation-0 white--text flex-grow-1"
                    x-large>Close</v-btn>
            </div>
        </div>
    </v-card>
</template>
