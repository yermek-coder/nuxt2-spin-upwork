<template>
    <v-container class="properties-promos overflow-x-auto hide-scrollbar">
        <div v-for="(promo, index) in promos" :key="(index)"
            class="py-4 px-5 d-inline-flex flex-column align-start properties-promos-item rounded-lg-2 overflow-hidden white--text"
            :style="`background: linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${promo.bgImg}) no-repeat center / cover`">
            <div class="text-h6 mb-1">{{ promo.title }}</div>
            <div class="mb-3">
                <div class="text-body-4 properties-promos-descr text-wrap">{{ promo.descr }}</div>
            </div>
            <v-btn rounded small color="teal lighten-5" class="teal--text text-body-3">Get it
                now</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            promos: [
                {
                    title: "Interior Design",
                    descr: "Insert your property name to get design solution",
                    bgImg: "/card-bg.webp"
                },
                {
                    title: "Interior Design",
                    descr: "Insert your property name to get design solution",
                    bgImg: "/card-bg.webp"
                }
            ]
        }
    }
}
</script>