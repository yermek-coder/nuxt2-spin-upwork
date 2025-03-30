<template>
    <div class="search-results">
        <v-container class="py-5 pb-1">
            <div>
                <Breadcrumbs />
                <div class="d-flex gap-3">
                    <SearchField :filters="{ q }" class="flex-grow-1" />
                    <PropertyMaps />
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="d-flex flex-column">
                <div class="property-filters overflow-x-auto hide-scrollbar d-flex align-items-center gap-2 mb-6">
                    <div @click="openFilterDialog" v-for="feature in features" :key="feature.component"
                        :class="feature.classname">
                        <v-chip>
                            {{ feature.title }}
                            <v-icon class="ms-1">mdi-chevron-down</v-icon>
                        </v-chip>
                    </div>
                </div>

                <div class="properties-list properties-list-single-col">
                    <PropertyCard2 v-for="item in properties" :key="item.property_id" :property="item" horizontal />
                </div>

                <NothingFound v-if="!properties.length" />
            </div>
        </v-container>
    </div>
</template>

<script>
import propertyService from "~/services/property"
import featureService from "~/services/feature"
import { clone, httpParamsToObject, objectToHttpParams } from '~/util';

export default {
    layout: "home",
    route: {
        title: "Search Results",
        hidden: true,
    },
    data() {
        return {
            filters: {},
            properties: [],
            q: ""
        }
    },
    created() {
        this.queryToFilters()
        this.init()
    },
    computed: {
        features() {
            return featureService.getFeatures("filter", { node: "property-search-onbording", filters: clone(this.filters) })
        }
    },
    watch: {
        activeCategory() {
            window.scrollTo(0, 0);
        }
    },
    methods: {
        async init() {
            this.properties = await propertyService.getPropertiesByFilters(this.filters)
        },
        queryToFilters() {
            this.filters = httpParamsToObject(this.$route.fullPath.split("?").pop())
        },
        async openFilterDialog() {
            const result = await propertyService.openSearchDialog({ filters: this.filters, node: "property-search-onbording" })
            if (result) {
                this.filters = result;
                this.$router.push({ path: '/home/search-results2?' + objectToHttpParams(result) })
                this.$working(this.init())
            }
        }
    }
}
</script>
