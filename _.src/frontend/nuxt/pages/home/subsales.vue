<template>
    <div class="subsales">
        <v-container class="py-5">
            <div>
                <Breadcrumbs />
                <div class="d-flex gap-3">
                    <SearchField action class="flex-grow-1" />
                    <PropertyMaps />
                </div>
            </div>
        </v-container>

        <HomeFeatures class="mb-5" open />

        <v-container>
            <PropertyFilters :filter="filters" node="subsales-properties" class="mb-1" />
            <PropertyCategories v-model="filters.category" class="mb-4" />

            <PropertyCard v-if="properties[0]" :property="properties[0]" horizontal class="mb-6" />

            <div class="properties-list">
                <PropertyCard v-for="(item, index) in properties.slice(1)" :key="index" :property="item" />
            </div>
        </v-container>

        <v-btn elevation="2" fab class="subsales-fab" right fixed>
            <Icon icon="map2" />
        </v-btn>
    </div>
</template>

<script>
import propertyServices from "~/services/property"

export default {
    layout: "home",
    route: {
        title: "Subsales",
        icon: "house",
        order: 0,
    },
    data() {
        return {
            filters: {},
            properties: propertyServices.getProperties()
        }
    }
}
</script>
