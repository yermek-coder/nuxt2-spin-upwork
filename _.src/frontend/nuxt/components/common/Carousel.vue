<template>
    <div class="carousel2 position-relative">
        <v-carousel ref="carousel" v-model="value" :show-arrows="false" hide-delimiters :height="height" class="mb-6">
            <slot />
        </v-carousel>
        <div class="carousel-delimeter d-flex gap-1 justify-center">
            <div v-for="idx in size" :key="idx" :class="idx - 1 === value ? 'primary px-2' : 'grey lighten-1'"
                class="pa-1 rounded-xl" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["height"],
    data() {
        return {
            value: 0,
            size: 0
        }
    },
    mounted() {
        this.size = this.$refs.carousel.items.length
    },
}
</script>