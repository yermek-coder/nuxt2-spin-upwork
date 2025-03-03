<template>
    <v-text-field @focus="openFilters" v-model="filters.q" :placeholder="placeholder" outlined clearable hide-details
        clear-icon="mdi-close-circle" color="primary" class="rounded-xl property-search">
        <template #prepend-inner>
            <div class="d-flex gap-2 align-center ms-1 black--text">
                <span class="font-weight-bold">PG</span>
                <v-icon>mdi-chevron-down</v-icon>
            </div>
        </template>
    </v-text-field>
</template>

<script>
import { debounce } from 'underscore';
import propertyService from '~/services/property';

export default {
    props: {
        filters: { type: Object, default: () => ({}) },
        action: Boolean,
        placeholder: { type: String, default: "Search here" }
    },
    methods: {
        /** @fixme Focus called multiple time for some reason */
        openFilters: debounce(function () {
            if (this.action) {
                propertyService.openSearchDialog(this.filters)
            }
        }, 100)
    }
}
</script>
