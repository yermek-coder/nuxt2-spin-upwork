<template>
    <div class="services-listing pb-16">
        <div class="white">
            <v-container class="pt-5 pb-0">
                <Breadcrumbs>
                    <v-btn icon class="ms-auto"><v-icon>mdi-menu</v-icon></v-btn>
                </Breadcrumbs>
            </v-container>
        </div>

        <v-container class="mb-3">
            <v-text-field v-model="filters.q" placeholder="Search here" outlined clearable hide-details
                clear-icon="mdi-close-circle" color="teal lighten-1" class="rounded-xl property-search mb-3">
                <template #prepend-inner>
                    <v-icon>mdi-magnify</v-icon>
                </template>
            </v-text-field>


            <div class="property-filters overflow-x-auto hide-scrollbar d-flex align-items-center gap-2 mb-3">
                <div v-for="category in categories" :key="category">
                    <ChipSelectorItem :model="filters" :value="category" property="category" class="justify-center">
                        {{ category }}
                    </ChipSelectorItem>
                </div>
            </div>

            <div class="d-flex gap-3 flex-column">
                <v-card v-for="service in services" :key="service.id" outlined class="rounded-xl">
                    <v-img :src="service.listingCover" class="rounded-xl ma-1 align-end"
                        gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%" height="130">
                        <div class="text-body-4 white--text pa-2">{{ service.location }}</div>
                    </v-img>

                    <div class="px-2 pb-2">
                        <div class="subtitle-2">{{ service.title }}</div>
                        <div class="d-flex align-center justify-space-between">
                            <div class="text-body-5 text--secondary-2">{{ service.agency }}</div>
                            <ServicePrice :service="service" />
                        </div>
                        <ServiceRating :service="service" full class="justify-space-between" />
                    </div>

                    <v-divider></v-divider>

                    <div class="d-flex align-center px-3 py-2">
                        <div class="text-body-2 flex-grow-1">
                            <span>Last Update:</span>
                            <span>{{ $date(service.updated, 'date_month_full') }}</span>
                        </div>
                        <v-btn small class="elevation-0 teal lighten-2 white--text">Published</v-btn>
                    </div>

                    <v-divider class="mb-1"></v-divider>

                    <div class="pa-2 pt-1">
                        <v-row dense>
                            <v-col cols="6">
                                <div class="d-flex">
                                    <v-btn outlined class="flex-grow-1 rounded-lg" color="teal">edit</v-btn>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="d-flex">
                                    <v-btn outlined class="flex-grow-1 rounded-lg" color="teal">view</v-btn>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="d-flex">
                                    <v-btn outlined class="flex-grow-1 rounded-lg" color="teal">delete</v-btn>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="d-flex">
                                    <v-btn outlined class="flex-grow-1 rounded-lg" color="teal">hide</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </div>
        </v-container>

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="d-flex">
                <v-btn class="elevation-0 flex-grow-1 teal lighten-2 white--text" x-large><v-icon>mdi-plus</v-icon>
                    <div class="ms-4">New Service</div>
                </v-btn>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import servicesManager from '@/services/services'

export default {
    route: {
        title: "Service Listing"
    },
    data() {
        return {
            filters: {
                q: "",
                category: 'All Services'
            },
            categories: [
                "All Services",
                "Renovation",
                "Cleaner",
                "Lawyers",
                "Value",
            ],
            services: servicesManager.getAll().slice(0, 3)
        }
    }
}
</script>