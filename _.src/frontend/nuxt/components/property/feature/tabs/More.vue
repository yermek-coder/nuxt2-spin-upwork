<template>
    <div class="property-feature-tabs-more">
        <div class="subtitle-2 mb-1">Area (㎡)</div>
        <v-row dense class="text-uppercase mb-3">
            <v-col v-for="(area, index) in areas" :key="index" cols="4">
                <ChipSelectorItem :model="filters" :value="area" property="area" class="justify-center">
                    {{ area }}
                </ChipSelectorItem>
            </v-col>
        </v-row>

        <div class="subtitle-2 mb-1">Type</div>
        <v-row dense class="text-uppercase mb-3">
            <v-col v-for="(type, index) in types" :key="index" cols="4">
                <ChipSelectorItem :model="filters" :value="type" property="type" class="justify-center">
                    {{ type }}
                </ChipSelectorItem>
            </v-col>
        </v-row>

        <div class="subtitle-2 mb-1">3D Viewing</div>
        <v-row dense class="text-uppercase mb-3">
            <v-col v-for="(item, index) in vr" :key="index" cols="4">
                <ChipSelectorItem :model="filters" :value="item" property="vr" class="justify-center">
                    {{ item }}
                </ChipSelectorItem>
            </v-col>
        </v-row>

        <div class="subtitle-2 mb-1">Building Features</div>
        <v-row dense class="text-uppercase mb-3">
            <v-col v-for="(item, index) in features" :key="index" cols="4">
                <ChipSelectorItem :model="filters" :value="item" property="features" class="justify-center">
                    {{ item }}
                </ChipSelectorItem>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ["filters"],
    feature: {
        type: "filter",
        node: "property-filters-dialog",
        title: "More",
        order: 400,
    },
    data() {
        return {
            areas: [
                "BELOW 50㎡",
                "50-70㎡",
                "70-90㎡",
                "90-120㎡",
                "120-150㎡",
                "150-200㎡",
            ],
            types: [
                "Residential",
                "Commercial",
                "loft",
            ],
            vr: [
                "3D Panorama",
                "daylight",
                "vr",
            ],
            features: [
                "Scenic view",
                "School",
                "BRand",
                "low prce",
                "low cost",
                "small unit",
            ]
        }
    }
}
</script>