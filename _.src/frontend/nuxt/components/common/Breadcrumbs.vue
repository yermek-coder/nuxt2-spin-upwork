<template>
    <div class="d-flex align-center gap-3 py-4">
        <v-btn @click="$router.push(page.parent)" icon small>
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <h4 class="text-uppercase flex-grow-1">{{ page.component.route.title || page.name }}</h4>
        <slot />
    </div>
</template>

<script>
export default {
    computed: {
        page() {
            return this.$routes.find(page => page.name === this.$route.name)
        }
    }
}
</script>