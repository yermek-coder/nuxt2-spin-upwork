<template>
    <div v-touch="{ left: () => folded = true, right: () => folded = false }" class="swipable">
        <div class="swipable-items" :style="{ '--anim-duration': `${duration}ms` }" :class="{ leaving, entering }">
            <div class="swipable-grid">
                <NuxtLink v-for="link in links.slice(0, 5)" :key="link.title" :to="link.url"
                    class="home-link d-flex flex-column align-center gap-1">
                    <Icon :icon="link.icon" />
                    <span class="swipable-title text-body-4 text-uppercase font-weight-bold">
                        {{ link.title }}</span>
                </NuxtLink>
            </div>
            <Collapsable :show="!folded" :duration="200">
                <div class="swipable-grid">
                    <NuxtLink v-for="link in links.slice(5)" :key="link.title" :to="link.url"
                        class="home-link d-flex flex-column align-center gap-1">
                        <Icon :icon="link.icon" />
                        <span class="swipable-title text-body-4 text-uppercase font-weight-bold">
                            {{ link.title }}</span>
                    </NuxtLink>
                </div>
            </Collapsable>
        </div>

        <div class="swipable-indicator d-flex gap-1">
            <div :style="{ width: `${folded ? 10 : 5}px` }" :class="`lighten-${folded ? 2 : 5}`"
                class="swipable-indicator-bar teal"></div>
            <div :style="{ width: `${folded ? 5 : 10}px` }" :class="`lighten-${folded ? 5 : 2}`"
                class="swipable-indicator-bar teal"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        links: Array,
        initiallyOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            leaving: false,
            entering: false,
            duration: 300,
            folded: !this.initiallyOpen
        }
    },
    watch: {
        folded(value) {
            if (value) {
                this.entering = true;
                setTimeout(() => {
                    this.entering = false
                }, 200)
            } else {
                this.leaving = true;
                setTimeout(() => {
                    this.leaving = false
                }, 200)
            }
        }
    }
}
</script>
