<template>
    <div>
        <v-container>
            <Breadcrumbs>
                <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </Breadcrumbs>

            <div>
                <v-card class="pa-4 mb-3" to="/my-articles">All Articles</v-card>
                <v-card class="pa-4" to="/my-videos">All Videos</v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: "dark",
    route: {
        title: "Articles & Videos"
    },
}
</script>