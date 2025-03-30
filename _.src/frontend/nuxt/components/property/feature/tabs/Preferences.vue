<template>
    <div class="d-flex flex-wrap justify-center gap-3 text-uppercase">
        <v-chip @click="toggle(preference)" v-for="preference in options" :key="preference.value"
            :class="{ 'teal lighten-4 teal--text': active(preference) }" class="justify-center">
            {{ preference.text }}
        </v-chip>
    </div>
</template>

<script>
import propertyService from '~/services/property';

export default {
    props: ["filters"],
    feature: {
        type: "filter",
        node: ["property-search-onbording"],
        title: "Preferences",
        order: 300,
    },
    data() {
        return {
            options: []
        }
    },
    async created() {
        this.options = await propertyService.getPropertyTags()
    },
    methods: {
        active(preference) {
            return (this.filters?.preferences || []).includes(preference.text)
        },
        toggle(preference) {
            if (!this.filters?.preferences) {
                this.$set(this.filters, "preferences", [])
            }

            if (this.active(preference)) {
                this.filters.preferences = this.filters.preferences.filter(item => item != preference.text)
            } else {
                this.filters.preferences.push(preference.text)
            }
        }
    }
}
</script>