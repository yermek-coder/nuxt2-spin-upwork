<template>
    <div class="d-flex flex-wrap justify-center gap-3 text-uppercase">
        <v-chip @click="toggle(type)" v-for="type in types" :key="type.value"
            :class="{ 'teal lighten-4 teal--text': active(type) }" class="justify-center">
            {{ type.text }}
        </v-chip>
    </div>
</template>

<script>
import propertyService from '~/services/property';

export default {
    props: ["filters"],
    feature: {
        type: "filter",
        node: ["property-filters-dialog", "property-search-onbording"],
        title: "House type",
        order: 300,
    },
    data() {
        return {
            types: []
        }
    },
    async created() {
        this.types = await propertyService.getPropertyTypes()
    },
    methods: {
        active(type) {
            return (this.filters?.property_type || []).includes(type.text)
        },
        toggle(type) {
            if (!this.filters?.property_type) {
                this.$set(this.filters, "property_type", [])
            }

            if (this.active(type)) {
                this.filters.property_type = this.filters.property_type.filter(item => item != type.text)
            } else {
                this.filters.property_type.push(type.text)
            }
        }
    }
}
</script>