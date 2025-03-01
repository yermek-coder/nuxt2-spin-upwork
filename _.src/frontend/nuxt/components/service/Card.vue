<template>
    <v-card :to="`/services/${service.id}`" outlined class="rounded-xl">
        <v-img :src="service.img" class="rounded-xl ma-1 align-end"
            gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%">
            <div class="text-body-4 white--text pa-2">{{ service.location }}</div>
        </v-img>

        <div class="px-2 pb-2">
            <ServiceRating :service="service" />
            <div class="subtitle-2">{{ service.title }}</div>
            <ServicePrice :service="service" />
            <div class="text-body-5 text--secondary-2">{{ service.agency }}</div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: { service: Object }
}
</script>