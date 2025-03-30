<template>
    <div class="d-flex flex-wrap justify-center gap-3 text-uppercase">
        <v-chip @click="toggle(state)" v-for="state in options" :key="state.state_id"
            :class="{ 'teal lighten-4 teal--text': active(state) }" class="justify-center">
            {{ state.name }}
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
        title: "States",
        order: 300,
    },
    data() {
        return {
            options: []
        }
    },
    async created() {
        this.options = await propertyService.getStates()
    },
    methods: {
        active(state) {
            return (this.filters?.state || []).includes(state.name)
        },
        toggle(state) {
            if (!this.filters?.state) {
                this.$set(this.filters, "state", [])
            }

            if (this.active(state)) {
                this.filters.state = this.filters.state.filter(item => item != state.name)
            } else {
                this.filters.state.push(state.name)
            }
        }
    }
}
</script>