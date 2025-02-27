<template>
    <v-container>
        <div class="home-services rounded-lg-2 overflow-hidden">
            <div class="home-services-header py-3 px-2 d-flex gap-3">
                <Icon icon="shield-check" />
                <span class="text-uppercase font-weight-bold white--text text-body-3">TOP SERVICES SEARCH</span>
            </div>
            <div v-if="swipable" class="pa-3 pb-4">
                <Swipable :links="services" initially-open class="pb-1" />
            </div>
            <div v-else class="home-services-body pa-3">
                <NuxtLink v-for="(item, idx) in services" :key="idx" :to="item.url"
                    class="d-flex flex-column align-center">
                    <Icon :icon="item.icon" />
                    <div class="text-body-4">{{ item.title }}</div>
                </NuxtLink>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    props: {
        swipable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            services: [
                {
                    title: "Moving",
                    icon: "wheel",
                    url: "#"
                },
                {
                    title: "Electrical",
                    icon: "electrical",
                    url: "#"
                },
                {
                    title: "Design",
                    icon: "design",
                    url: "#"
                },
                {
                    title: "Landscape",
                    icon: "leaf",
                    url: "#"
                },
                {
                    title: "Furniture",
                    icon: "furniture",
                    url: "#"
                },
                {
                    title: "Internet",
                    icon: "internet",
                    url: "#"
                },
                {
                    title: "Water",
                    icon: "water",
                    url: "#"
                },
                {
                    title: "Cleaner",
                    icon: "clean",
                    url: "#"
                },
                {
                    title: "Plumbers",
                    icon: "shower",
                    url: "#"
                },
                {
                    title: "Wireman",
                    icon: "wire",
                    url: "#"
                },
            ],
        }
    }
}
</script>