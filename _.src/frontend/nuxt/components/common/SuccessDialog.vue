<template>
    <v-card height="100" class="d-flex flex-column rounded-0 success-dialog">
        <v-container class="d-flex flex-column flex-grow-1 pt-16">
            <div class="d-flex flex-column align-center gap-4 pt-14">
                <img src="/decorations/success.svg" width="121" height="106"></img>
                <div class="font-weight-bold subtitle-1">{{ title }}</div>
                <div class="text-body-4 text-center px-6">{{ description }}</div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex">
                <v-btn @click="$emit('dismiss')" color="primary" class="flex-grow-1 elevation-0 white--text"
                    x-large>Close</v-btn>
            </div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: ["title", "description"]
}
</script>

<style scoped>
.success-dialog {
    min-height: 50vh;
}

.v-dialog--fullscreen .success-dialog {
    min-height: 100%;
}
</style>