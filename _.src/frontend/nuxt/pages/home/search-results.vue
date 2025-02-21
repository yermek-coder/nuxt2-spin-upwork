<template>
    <div class="search-results">
        <v-container class="py-5 pb-1">
            <div>
                <Breadcrumbs />
                <div class="d-flex gap-3">
                    <SearchField :filters="filters" class="flex-grow-1" />
                    <PropertyMaps />
                </div>
            </div>
        </v-container>

        <v-container>
            <div v-if="filters.q" class="d-flex flex-column">
                <template v-for="(item, idx) in searchResults">
                    <div class="d-flex gap-3 align-center py-3">
                        <v-icon class="grey--text">{{ item.icon }}</v-icon>
                        <div class="flex-grow-1 subtitle-2" v-html="item.html"></div>
                        <v-chip label small>
                            {{ item.city }}
                        </v-chip>
                    </div>
                    <v-divider v-if="idx < (searchResults.length - 1)"></v-divider>
                </template>
            </div>

            <template v-else>
                <template v-if="activeCategory">
                    <div class="text-body-3 text--secondary mb-3">
                        Properties for {{ activeCategory }} in Tanjung Tokong, Penang
                    </div>

                    <div class="property-filters overflow-x-auto hide-scrollbar d-flex align-items-center gap-2">
                        <div v-for="feature in features" :key="feature.component" :class="feature.classname">
                            <v-chip @click="openFilters">
                                {{ feature.title }}
                                <v-icon class="ms-1">mdi-chevron-down</v-icon>
                            </v-chip>
                        </div>
                    </div>

                    <PropertyCategories v-model="filters.category" class="mb-4" />
                    <div class="properties-list properties-list-single-col">
                        <PropertyCard v-for="(item, index) in properties" :key="index" :property="item" horizontal />
                    </div>
                </template>

                <template v-else>
                    <PropertyCategories v-model="filters.category" :categories="groupCategories" class="mb-4" />
                    <div class="properties-list properties-list-single-col gap-4">
                        <v-card v-for="category in categories" :key="category.title" class="pa-3 white" outlined>
                            <div class="subtitle-1 font-weight-bold mb-2">{{ category.title }} ({{ category.amount }})
                            </div>
                            <div class="properties-list properties-list-single-col">
                                <PropertyCard v-for="(item, index) in properties.slice(0, 4)" :key="index"
                                    :property="item" horizontal />
                                <div class="d-flex justify-center">
                                    <v-btn :to="{ query: { category: category.title } }" class="align-self-center" text>
                                        See More
                                        <v-icon right>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </template>
            </template>
        </v-container>
    </div>
</template>

<script>
import propertyService from "~/services/property"
import featureService from "~/services/feature"
import { clone } from '~/util';

export default {
    layout: "home",
    route: {
        title: "Search Results",
        hidden: true,
    },
    data() {
        return {
            filters: {},
            properties: propertyService.getProperties(),
            categories: [
                { amount: 200, title: 'Subsales' },
                { amount: 10, title: 'New Projects' },
                { amount: 40, title: 'Rental' }
            ],
            groupCategories: [
                { title: "All", value: "all" },
                { title: "Subsales", value: "subsales" },
                { title: "New Projects", value: "new_projects" },
                { title: "Rent", value: "rent" },
            ],
            searchResults: [
                {
                    icon: "mdi-map-marker",
                    html: "<span class='teal--text'>Tanjung</span> Tokong",
                    city: "City/Area"
                },
                {
                    icon: "mdi-map-marker",
                    html: "<span class='teal--text'>Tanjung</span> Bungah",
                    city: "City/Area"
                },
                {
                    icon: "mdi-office-building",
                    html: "<span class='teal--text'>Tanjung</span> Park Condominium",
                    city: "Condominium"
                }
            ],
        }
    },
    computed: {
        activeCategory() {
            return this.$route.query?.category
        },
        features() {
            return featureService.getFeatures("filter", { node: "property-filters-dialog", filters: clone(this.filters) })
        }
    },
    watch: {
        activeCategory() {
            window.scrollTo(0, 0);
        }
    },
    methods: {
        openFilters() {
            propertyService.openSearchDialog(this.filters)
        }
    }
}
</script>
