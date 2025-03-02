<template>
</template>

<script>
export default {
    mounted() {
        this.$vuetify.theme.isDark = true
    },
    unmounted() {
        this.$vuetify.theme.isDark = false
    }
}
</script>