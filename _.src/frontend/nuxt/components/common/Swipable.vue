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

<style lang="scss">
.swipable-title {
    line-height: 1.375rem;
}

.swipable {
    position: relative;
}

.swipable-items.entering {
    animation-duration: var(--anim-duration);
    animation-name: slide-in;
}

.swipable-items.leaving {
    animation-duration: var(--anim-duration);
    animation-name: slide-in-2;
}

@keyframes slide-in {
    from {
        translate: 100vw 0;
        scale: 200% 1;
        opacity: 0.5;
    }

    to {
        translate: 0 0;
        scale: 100% 1;
        opacity: 1;
    }
}

@keyframes slide-in-2 {
    from {
        translate: -100vw 0;
        scale: 200% 1;
        opacity: 0.5;
    }

    to {
        translate: 0 0;
        scale: 100% 1;
        opacity: 1;
    }
}

.swipable-grid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    row-gap: 0.625rem;
    overflow: hidden;
}

.swipable-indicator {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
}

.swipable-indicator-bar {
    border-radius: 5px;
    height: 5px;
}
</style>