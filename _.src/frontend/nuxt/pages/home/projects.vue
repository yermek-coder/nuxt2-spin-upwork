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

        <PropertyPromos />

        <HomeFeatures class="mb-5" open />

        <v-container>
            <v-card outlined class="property-launches px-3 py-2">
                <div class="pa-0 font-weight-bold d-flex align-center text-body-3">
                    <span>New Launches</span>
                    <div class="text-caption ms-auto d-flex align-center text--secondary">
                        <span>View All</span>
                        <v-icon class="text-body-1">mdi-chevron-right</v-icon>
                    </div>
                </div>
                <v-card-subtitle class="pa-0 text-body-5 lh-1 mb-3">
                    Explore new and upcoming property launches in Malaysia
                </v-card-subtitle>

                <div class="property-launches-body d-flex overflow-auto hide-scrollbar gap-1">
                    <div v-for="(item, idx) in launches" :key="idx" class="property-launches-body-item">
                        <v-img :src="item.preview" height="88" width="88" class="align-end rounded-lg"
                            gradient="0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 15px">
                            <Icon icon="new" class="property-launches-body-item-marker" />
                            <div class="white--text text-body-6 d-flex align-center px-1 mb-1"><v-icon
                                    class="white--text text-body-4">mdi-map-marker</v-icon>
                                {{ item.location }}
                            </div>
                        </v-img>
                        <div class="text-body-4 mt-1">{{ item.title }}</div>
                    </div>
                </div>
            </v-card>
        </v-container>

        <v-container>
            <PropertyFilters :filter="filters" node="subsales-properties" class="mb-1" />
            <PropertyCategories v-model="filters.category" class="mb-4" />

            <div class="properties-list properties-list-single-col">
                <PropertyCard v-for="(item, index) in properties" :key="index" :property="item" horizontal />
            </div>
        </v-container>
    </div>
</template>

<script>
import propertyServices from "~/services/property"

export default {
    layout: "home",
    route: {
        title: "New Projects",
        icon: "projects",
        order: 300,
    },
    data() {
        return {
            filters: {},
            properties: propertyServices.getProperties(),
            launches: [
                { title: "Africa", location: "Tanjung Tokong, Penang", preview: "/launch1.jpg" },
                { title: "FERA", location: "Tanjung Tokong, Penang", preview: "/launch2.jpg" },
                { title: "The Lume", location: "Tanjung Tokong, Penang", preview: "/launch3.jpg" },
                { title: "Africa", location: "Tanjung Tokong, Penang", preview: "/launch4.jpg" },
            ]
        }
    }
}
</script>
