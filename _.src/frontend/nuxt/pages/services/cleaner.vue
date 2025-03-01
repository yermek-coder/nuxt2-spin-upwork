<template>
    <div>
        <div class="home-header">
            <v-container class="pt-5 pb-0">
                <Breadcrumbs />
                <Location />
            </v-container>
        </div>
        <v-container class="pt-4 pb-0">
            <div class="d-flex gap-3">
                <SearchField class="flex-grow-1" />
            </div>
        </v-container>

        <HomeServices :items="topServices" class="pb-1" />

        <v-container>
            <v-row dense>
                <v-col v-for="(service, idx) in services" :key="service.id" cols="6">
                    <ServiceCard :service="service" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import servicesManager from '@/services/services'

export default {
    layout: "home",
    route: {
        title: "Cleaner",
    },
    data() {
        return {
            services: servicesManager.getAll(),
            topServices: [
                {
                    title: "Carpet",
                    icon: "wheel",
                    url: "#"
                },
                {
                    title: "Mattress",
                    icon: "electrical",
                    url: "#"
                },
                {
                    title: "Commercial",
                    icon: "design",
                    url: "#"
                },
                {
                    title: "Home",
                    icon: "leaf",
                    url: "#"
                },
                {
                    title: "Others",
                    icon: "furniture",
                    url: "#"
                },
            ]
        }
    }
}
</script>