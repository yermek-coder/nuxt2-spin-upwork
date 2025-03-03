<template>
    <v-card height="100" class="rounded-0 d-flex flex-column">
        <v-container class="d-flex flex-column flex-grow-1 pt-16">
            <div class="d-flex flex-column align-center gap-4 pt-14">
                <img src="/decorations/success.svg" width="121" height="106"></img>
                <div class="subtitle-1 font-weight-bold">{{ title }}</div>
                <div class="text-body-4 text-center px-6">{{ description }}</div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex">
                <v-btn @click="$emit('dismiss')" color="primary" class="elevation-0 white--text flex-grow-1"
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