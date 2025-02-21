<template>
    <div class="property-filters overflow-x-auto hide-scrollbar d-flex align-items-center gap-2">
        <div v-for="feature in features" :key="feature.component" :class="feature.classname">
            <component :is="feature.component" :feature="feature" v-bind="$props" />
        </div>
    </div>
</template>

<script>
import featureService from "~/services/feature"

export default {
    props: ["filters", "node"],
    computed: {
        features() {
            return featureService.getFeatures("filter", this.$props)
        }
    }
}
</script>