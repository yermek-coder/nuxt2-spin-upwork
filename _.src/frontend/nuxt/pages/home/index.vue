<template>
    <div>
        <div class="home-header">
            <v-container class="py-5">
                <div>
                    <Location />
                    <div class="d-flex gap-3">
                        <SearchField action class="flex-grow-1" />
                        <PropertyMaps />
                    </div>
                </div>
            </v-container>
        </div>

        <div v-touch="{ left: () => folded = true, right: () => folded = false }">
            <v-container class="home-links pt-6 pb-0">
                <NuxtLink v-for="link in links" :key="link.path" :to="link.path"
                    class="home-links-link d-flex flex-column align-center px-1">
                    <div class="home-links-link-card teal lighten-5 d-flex align-center justify-center rounded-xl">
                        <Icon :icon="link.icon" />
                    </div>
                    <div
                        class="home-links-link-text text-body-4 font-weight-bold text-uppercase text-center text--primary">
                        {{ link.title }}
                    </div>
                </NuxtLink>
            </v-container>

            <HomeFeatures :folded="folded" class="mb-8" />
        </div>

        <PropertyPromos />

        <v-container>
            <div class="home-services rounded-lg-2 overflow-hidden">
                <div class="home-services-header py-3 px-2 d-flex gap-3">
                    <Icon icon="shield-check" />
                    <span class="text-uppercase font-weight-bold white--text text-body-3">TOP SERVICES SEARCH</span>
                </div>
                <div class="home-services-body pa-3">
                    <div v-for="(item, idx) in services" :key="idx" class="d-flex flex-column align-center">
                        <Icon :icon="item.icon" />
                        <div class="text-body-4">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </v-container>

        <v-container class="home-videos mb-5">
            <div class="d-flex align-center justify-space-between mb-4">
                <div class="text-h6">Videos</div>
                <NuxtLink to="#" class="text-decoration-underline text-caption text--secondary">View All</NuxtLink>
            </div>

            <div class="home-videos-list overflow-x-auto hide-scrollbar">
                <div @click="playVideo(item)" v-for="(item, idx) in videos" :key="idx" class="home-videos-list-item">
                    <v-btn text color="white"><v-icon class="text-h3">mdi-play-circle-outline</v-icon></v-btn>
                    <img :src="item.thumbnail" alt="Video" class="rounded-xl">
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="text-h6 mb-3">Recommend Properties</div>

            <v-chip-group v-model="activePropertyCategory" mandatory class="mb-3">
                <v-chip v-for="(category, index) in categories" :key="index" active-class="teal--text text-lighten-2">
                    {{ category.title }}
                </v-chip>
            </v-chip-group>

            <div class="properties-list">
                <PropertyCard v-for="(item, index) in properties" :key="index" :property="item" />
            </div>
        </v-container>
    </div>
</template>

<script>
import propertyService from "~/services/property"

export default {
    route: {
        order: 0,
        title: "Home",
        icon: "e",
        navGroup: "home"
    },
    layout: "home",
    data() {
        return {
            folded: true,
            services: [
                {
                    title: "Moving",
                    icon: "wheel"
                },
                {
                    title: "Electrical",
                    icon: "electrical"
                },
                {
                    title: "Design",
                    icon: "design"
                },
                {
                    title: "Landscape",
                    icon: "leaf"
                },
                {
                    title: "Furniture",
                    icon: "furniture"
                },
                {
                    title: "Internet",
                    icon: "internet"
                },
                {
                    title: "Water",
                    icon: "water"
                },
                {
                    title: "Cleaner",
                    icon: "clean"
                },
                {
                    title: "Plumbers",
                    icon: "shower"
                },
                {
                    title: "Wireman",
                    icon: "wire"
                },
            ],
            videos: [
                { src: "/video.mp4", thumbnail: "/video-thumbnail.webp" },
                { src: "/video.mp4", thumbnail: "/video-thumbnail.webp" },
                { src: "/video.mp4", thumbnail: "/video-thumbnail.webp" },
                { src: "/video.mp4", thumbnail: "/video-thumbnail.webp" },
                { src: "/video.mp4", thumbnail: "/video-thumbnail.webp" },
            ],
            activePropertyCategory: "all",
            properties: propertyService.getProperties(),
            categories: [
                {
                    title: "All",
                    value: "all",
                },
                {
                    title: "Subsales",
                    value: "subsales",
                },
                {
                    title: "New Projects",
                    value: "new",
                },
                {
                    title: "Rent",
                    value: "rent",
                },
                {
                    title: "Luxury",
                    value: "luxury",
                },
                {
                    title: "Commercial",
                    value: "commercial",
                },
                {
                    title: "Condos",
                    value: "condos",
                },
            ],
        }
    },
    computed: {
        links() {
            return this.$routes
                .filter(route => route.parent === "/home" && route.component?.route && !route.component?.route?.hidden)
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: name.split("-").pop(), path, icon: component.route.icon, }))
        }
    },
    methods: {
        playVideo(video) {
            this.$modal({ component: "VideoDialog", props: { video, fullscreen: false, width: "100%" } })
        },
    }
}
</script>