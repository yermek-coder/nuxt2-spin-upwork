<template>
    <v-bottom-navigation fixed class="bottom-navigation" height="78">
        <NuxtLink v-for="link in links" :key="link.path" :to="link.path"
            class="d-flex flex-column align-center text-uppercase text-body-4" active-class="teal--text">
            <Icon :icon="link.icon" />
            <span>{{ link.name }}</span>
        </NuxtLink>
    </v-bottom-navigation>
</template>

<script>
export default {
    computed: {
        links() {
            return this.$routes
                .filter(route => route.parent === "/" && route.component?.route && route.component?.route?.navGroup === "home")
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component }) => ({ name: component.route.title, path, icon: component.route.icon, }))
        }
    }
}
</script>