<template>
    <v-row dense class="property-feature-tabs-house-type text-uppercase">
        <v-col v-for="(type, index) in types" :key="index" cols="4">
            <ChipSelectorItem :model="filters" :value="type" property="type" class="justify-center">
                {{ type }}
            </ChipSelectorItem>
        </v-col>
    </v-row>

</template>

<script>
export default {
    props: ["filters"],
    feature: {
        type: "filter",
        node: "property-filters-dialog",
        title: "House type",
        order: 300,
    },
    data() {
        return {
            types: [
                "Rent",
                "subsale",
                "luxury",
                "Condos",
                "affordable",
                "commercial",
            ]
        }
    }
}
</script>