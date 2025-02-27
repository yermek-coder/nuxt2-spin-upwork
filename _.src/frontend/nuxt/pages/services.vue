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

        <HomeServices swipable class="pb-1" />

        <v-container>
            <v-row dense>
                <v-col v-for="(service, idx) in services" :key="idx" cols="6">
                    <v-img v-if="service.isPromo" :src="service.src">
                    </v-img>
                    <ServiceCard v-else :service="service" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    layout: "home",
    route: {
        title: "Services",
    },
    data() {
        return {
            services: [
                {
                    isPromo: true,
                    src: "/banner-promo.jpg"
                },
                ...Array(3).fill({
                    title: "Variety Home and Office Cleaning Service",
                    location: "Bandar Meru Raya, Ipoh, Perak",
                    review: "5.0 (1230)",
                    price: "90/hr ",
                    agency: "ABC Cleaner Agency Sdn Bhd",
                    img: '/service-preview.jpg'
                })
            ]
        }
    }
}
</script>