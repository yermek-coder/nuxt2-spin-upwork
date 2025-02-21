<template>
    <v-app dark>
        <v-main>
            <Nuxt class="default-layout" />
            <HomeBottomNavigation />
        </v-main>
        <Modals />
    </v-app>
</template>

<script>
export default {
    name: 'home'
}
</script>