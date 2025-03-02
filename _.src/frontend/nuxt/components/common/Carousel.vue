<template>
    <div ref="carousel" class="carousel">
        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkCounter: 0,
            flickity: null,
        }
    },
    mounted() {
        this.init()
    },
    unmounted() {
        this.flickity?.destroy?.()
    },
    methods: {
        init() {
            this.checkCounter += 1;
            if (window.Flickity) {
                this.flickity = new window.Flickity(this.$refs.carousel, {
                    wrapAround: true,
                    lazyLoad: true,
                    imagesLoaded: true,
                    prevNextButtons: false
                })
            } else if (this.checkCounter < 10) {
                setTimeout(this.init, 100)
            }
        }
    }
}
</script>