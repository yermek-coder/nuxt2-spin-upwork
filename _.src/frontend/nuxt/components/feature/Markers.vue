<template>
    <div class="d-flex flex-wrap align-items-center gap-3 feature-markers">
        <component v-for="feature in markers" :key="feature.component" :is="feature.component" :feature="feature"
            v-bind="$props" :class="feature.classname" />
    </div>
</template>

<script>
import featureService from "~/services/feature";
export default {
    props: { node: String, entity: Object },
    computed: {
        markers() {
            return featureService.getFeatures("marker", this.$props)
        }
    }
}
</script>
