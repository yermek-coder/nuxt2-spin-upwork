<template>
    <div :class="{ show }" :style="{ '--anim-duration': duration, '--anim-timing': timing }" class="collapsable">
        <div :style="{ overflow }">
            <slot />
        </div>
    </div>
</template>

<script>
// Thanks Kevin ^^ -> https://www.youtube.com/watch?v=JD4ws4cY1ro
export default {
    props: ["show", "duration", "timing"],
    data: () => ({ overflow: null }),
    watch: {
        show: {
            immediate: true,
            handler: function (shown) {
                setTimeout(() => (this.overflow = shown ? "initial" : null), shown && (this.duration || 150));
            }
        }
    }
};
</script>

<style lang="scss">
.collapsable {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows calc(var(--anim-duration, 150) * 1ms) var(--anim-timing, ease);

    > div {
        overflow: hidden;
        min-width: 0;
    }

    &.show {
        grid-template-rows: 1fr;
    }
}
</style>
