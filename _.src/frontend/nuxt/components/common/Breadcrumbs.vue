<template>
    <div class="d-flex align-center gap-3 py-4 breadcrumbs">
        <v-btn @click="goBack" icon small>
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div class="text-capitalize flex-grow-1 breadcrumbs-title">
            {{ pageTitle }}
        </div>
        <v-spacer></v-spacer>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        parent: String,
    },
    computed: {
        page() {
            const path = this.$route.path.endsWith("/") ? this.$route.path.slice(0, -1) : this.$route.path
            if (this.$route?.name) {
                return this.$routes.find(page => page.name === this.$route.name || page.path === path)
            }
        },
        pageTitle() {
            return this.title || this.page?.component?.route?.title || this.page?.name
        }
    },
    methods: {
        goBack() {
            if (this.title) {
                this.parent ? this.$router.push(this.parent) : this.$router.go(-1)
            } else if (this.page?.parent) {
                this.$router.push(this.page.parent)
            }
        }
    }
}
</script>