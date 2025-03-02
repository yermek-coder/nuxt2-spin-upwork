<template>
    <v-card class="property-filters-dialog rounded-0">
        <v-container class="overflow-hidden">
            <div class="d-flex align-center gap-4 mb-2">
                <a @click="$emit('dismiss')" role="button" class="black--text">
                    <v-icon>mdi-arrow-left</v-icon>
                </a>
                <SearchField :filters="cloneFilters" class="flex-grow-1" />
            </div>

            <v-chip-group v-model="tab" mandatory class="mb-2">
                <v-chip v-for="(tab, index) in tabs" :key="index" :value="tab.component"
                    active-class="teal--text text--lighten-2">
                    {{ tab.title }}
                </v-chip>
            </v-chip-group>

            <component v-if="activeTab" :is="activeTab.component" :filters="cloneFilters" class="mb-3" />

            <div class="d-flex gap-2">
                <v-btn @click="reset" text x-large elevation="0">reset</v-btn>
                <v-btn @click="$emit('close', 'result')" color="teal lighten-1" x-large class="white--text flex-grow-1"
                    elevation="0">confirm</v-btn>
            </div>
        </v-container>
    </v-card>
</template>

<script>
import featureService from '~/services/feature';
import { clone } from '~/util';

export default {
    props: ["filters"],
    data() {
        return {
            tab: null,
            cloneFilters: clone(this.filters)
        }
    },
    computed: {
        activeTab() {
            return this.tabs.find(tab => tab.component === this.tab)
        },
        tabs() {
            return featureService.getFeatures("filter", { node: "property-filters-dialog", filters: this.cloneFilters })
        }
    },
    methods: {
        reset() {
            this.cloneFilters = clone(this.filters)
        }
    }
}
</script>