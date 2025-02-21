<template>
    <v-row dense class="text-uppercase">
        <v-col v-for="(item, index) in sort" :key="index" cols="12">
            <ChipSelectorItem :model="filters" :value="item" property="sort" class="justify-center">
                {{ item }}
            </ChipSelectorItem>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["filters"],
    feature: {
        type: "filter",
        nodes: ["property-filters-dialog", "agents-search-results"],
        title: "Sort",
        order: 500,
        activeTitle: "Experience from high to low"
    },
    data() {
        return {
            sort: [
                "default",
                "Experience from high to low",
                "Experience from low to high",
            ]
        }
    }
}
</script>