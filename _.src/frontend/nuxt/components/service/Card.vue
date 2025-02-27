<template>
    <v-card outlined class="rounded-xl">
        <v-img :src="service.img" class="rounded-xl ma-1 align-end"
            gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%">
            <div class="text-body-4 white--text pa-2">{{ service.location }}</div>
        </v-img>

        <div class="px-2 pb-2">
            <div class="d-flex align-center gap-1 text-body-4">
                <v-icon class="yellow--text text-body-2">mdi-star</v-icon>
                <div>{{ service.review }}</div>
            </div>
            <div class="subtitle-2">{{ service.title }}</div>
            <div>
                <span class="text--secondary text-body-4">from</span>
                <span class="text-body-2 teal--text font-weight-bold">{{ service.price }}</span>
            </div>
            <div class="text-body-5 text--secondary-2">{{ service.agency }}</div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: { service: Object }
}
</script>