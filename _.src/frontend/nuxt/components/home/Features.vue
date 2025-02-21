<template>
    <v-container class="home-features">
        <div class="home-features-items" :style="{ '--anim-duration': `${duration}ms` }" :class="{ leaving, entering }">
            <div class="home-features-grid">
                <component v-for="feature in features.slice(0, 5)" :key="feature.component" :is="feature.component" />
            </div>
            <Collapsable :show="!folded" :duration="200">
                <div class="home-features-grid">
                    <component v-for="feature in features.slice(5)" :key="feature.component" :is="feature.component" />
                </div>
            </Collapsable>
        </div>

        <div class="home-features-indicator d-flex gap-1">
            <div :style="{ width: `${folded ? 10 : 5}px` }" :class="`lighten-${folded ? 2 : 5}`"
                class="home-features-indicator-bar teal"></div>
            <div :style="{ width: `${folded ? 5 : 10}px` }" :class="`lighten-${folded ? 5 : 2}`"
                class="home-features-indicator-bar teal"></div>
        </div>
    </v-container>
</template>

<script>
import featureService from '~/services/feature';

export default {
    props: { folded: Boolean },
    data() {
        return {
            features: [],
            leaving: false,
            entering: false,
            duration: 300
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
    },
    created() {
        this.features = featureService.getFeatures("action", { node: "home-top" });
    }
}
</script>