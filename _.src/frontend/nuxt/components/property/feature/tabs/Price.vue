<template>
    <div class="property-feature-tabs-price">
        <v-card v-if="node !== 'property-search-onbording'" outlined
            class="d-flex rounded-xl justify-space-between mb-4">
            <button @click="setMode('total')" :class="{ 'teal--text': filters.mode === 'total' }" class="px-6 py-3">
                Total price (RM)
            </button>
            <button @click="setMode('per_shift')" :class="{ 'teal--text': filters.mode === 'per_shift' }"
                class="px-6 py-3">
                Price per shift (RM)
            </button>
        </v-card>

        <v-row dense class="mb-2">
            <v-col v-for="(price, index) in priceRange" :key="index" cols="4">
                <v-chip @click="setPriceRange(price)" class="property-feature-tabs-price-chip justify-center">
                    {{ price }}
                </v-chip>
            </v-col>
        </v-row>

        <div class="d-flex align-center gap-2">
            <v-divider></v-divider>
            <span>OR</span>
            <v-divider></v-divider>
        </div>

        <div class="mb-6">
            <div class="d-flex align-center">
                <span class="subtitle-2 me-auto">Price between</span>
                <span class="caption text-body-3">Reset</span>
            </div>

            <v-range-slider v-model="range" :max="550000" :min="10000" thumb-color="primary" thumb-label="always"
                track-fill-color="primary" track-color="grey lighten-3" class="align-center white--text">
                <template #thumb-label="{ value }">${{ currency(value) }}K</template>
            </v-range-slider>
        </div>
    </div>
</template>

<script>
const priceMap = {
    '100K Below': [10000, 100000],
    '100K - 150K': [100000, 150000],
    '150K - 200K': [150000, 200000],
    '300K - 350K': [300000, 350000],
    '400K - 450K': [400000, 450000],
    '500K - 500K': [500000, 550000],
}

export default {
    props: ["filters", "node"],
    feature: {
        type: "filter",
        nodes: ["property-filters-dialog", "property-search-onbording"],
        title: "Price",
        order: 100,
    },
    data() {
        return {
            priceRange: Object.keys(priceMap),
        }
    },
    computed: {
        range: {
            get() {
                return Object.values(this.filters?.budget || {})
            },
            set(range) {
                this.$set(this.filters, "budget", { min: range[0], max: range[1] })
            }
        }
    },
    created() {
        this.setMode('total')
        if (!this.filters?.budget) {
            this.$set(this.filters, "budget", { min: 200000, max: 300000 })
        }
    },
    methods: {
        setMode(mode) {
            this.$set(this.filters, "mode", mode)
        },
        currency(value) {
            return (value / 1000) << 0
        },
        setPriceRange(key) {
            this.range = priceMap[key]
        }
    }
}
</script>