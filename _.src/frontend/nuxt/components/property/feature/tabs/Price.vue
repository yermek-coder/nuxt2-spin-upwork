<template>
    <div class="property-feature-tabs-price">
        <v-card outlined class="d-flex rounded-xl justify-space-between mb-4">
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
                <ChipSelectorItem :model="filters" :value="price" property="price"
                    class="property-feature-tabs-price-chip justify-center">
                    {{ price }}
                </ChipSelectorItem>
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

            <v-range-slider v-model="range" :max="1000000" :min="10000" thumb-color="teal lighten-1"
                thumb-label="always" track-fill-color="teal lighten-2" track-color="grey lighten-3"
                class="align-center white--text">
                <template #thumb-label="{ value }">{{ currency(value) }}</template>
            </v-range-slider>
        </div>
    </div>
</template>

<script>
import { debounce } from 'underscore';

export default {
    props: ["filters"],
    feature: {
        type: "filter",
        node: "property-filters-dialog",
        title: "Price",
        order: 100,
    },
    data() {
        return {
            priceRange: [
                '100K Below',
                '100K - 150K',
                '150K-200K',
                '300K - 350K',
                '400K - 450K',
                '500K - 500K',
            ],
            range: [200000, 600000]
        }
    },
    mounted() {
        this.setMode('total')
    },
    methods: {
        setMode(mode) {
            this.$set(this.filters, "mode", mode)
        },
        currency(value) {
            return `$${(value / 1000) << 0}K`
        }
    }
}
</script>