<template>
</template>

<script>
export default {
    watch: {
        '$vuetify.theme.isDark': {
            handler() {
                this.$vuetify.theme.isDark = true
            },
            once: true,
            immediate: true
        }
    },
    beforeDestroy() {
        this.$vuetify.theme.isDark = false
    }
}
</script>