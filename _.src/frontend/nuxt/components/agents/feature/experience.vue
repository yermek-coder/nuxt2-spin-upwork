<template>
    <v-row dense class="text-uppercase">
        <v-col v-for="(item, index) in sort" :key="index" cols="12">
            <v-chip @click="setExperience(item)" :class="{ 'teal--text': filters.experience === item }"
                class="justify-center">{{ item }}</v-chip>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["filters"],
    feature: {
        type: "filter",
        nodes: ["property-filters-dialog", "agents-search-results"],
        title: "Experience",
        order: 400,
        activeTitle: "Below 3 years",
    },
    data() {
        return {
            sort: [
                "No limit",
                "below 3 years",
                "3 - 5 years",
                "above 5 years",
            ]
        }
    },
    methods: {
        setExperience(experience) {
            this.$set(this.filters, "experience", experience)
        },
    }
}
</script>