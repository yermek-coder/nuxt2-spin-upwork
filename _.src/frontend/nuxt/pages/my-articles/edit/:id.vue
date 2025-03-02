<template>
    <div>
        <DarkTheme />
        <v-container>
            <div class="d-flex align-center gap-3 py-4 px-3">
                <v-btn @click="$router.go(-1)" icon small>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn outlined color="teal" class="rounded-lg ms-auto">Preview</v-btn>
                <v-btn color="teal" class="rounded-lg">Next Step</v-btn>
            </div>

            <v-divider></v-divider>

            <v-divider></v-divider>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>