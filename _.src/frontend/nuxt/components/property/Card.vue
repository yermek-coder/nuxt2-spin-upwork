<template>
    <v-card rounded="xl" :class="{ horizontal }" class="property-card elevation-0">
        <div class="property-card-image">
            <div class="card-image-badge px-2 text-body-4 rounded-sm rounded-tl-0"
                :class="propertyBadgeMap[property.badge].class">
                <span :class="propertyBadgeMap[property.badge].class" class="card-image-badge-decor darken-3"></span>
                {{ propertyBadgeMap[property.badge].title }}
            </div>
            <v-img :src="property.preview.src" height="145px" :class="{ 'mb-3': !horizontal }"
                gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%" class="align-end rounded-xl">
                <button v-if="property.vr" class="property-card-button-vr px-2 py-1 rounded-xl d-flex">
                    <Icon icon="vr" />
                </button>
                <div class="white--text text-body-6 d-flex gap-1 align-center pa-2"><v-icon
                        class="white--text text-caption">mdi-map-marker</v-icon>
                    {{ property.location }}
                </div>
            </v-img>
        </div>
        <div class="property-card-body d-flex flex-column gap-2">
            <div class="text-body-3 px-2">
                <span class="font-weight-bold">{{ property.category + ". " }}</span>
                <span class="font-weight-medium">{{ property.title }}</span>
            </div>
            <div class="px-2 d-flex gap-1 flex-wrap">
                <v-chip v-for="(tag, index) in property.tags" :key="index" x-small outlined class="px-1">
                    {{ tag }}
                </v-chip>
            </div>
            <FeatureMarkers node="property-card" :entity="property" class="text-body-4 px-2 text--secondary" />
            <v-divider></v-divider>
            <div class="property-card-footer px-2 mt-auto mb-2 teal--text text-body-3 font-weight-bold">
                {{ getPrice(property) }}
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: { property: Object, horizontal: Boolean },
    data() {
        return {
            propertyBadgeMap: {
                featured: {
                    title: "Featured",
                    class: "teal white--text",
                },
                highlight: {
                    title: "Highlight",
                    class: "amber accent-3",
                },
                urgent: {
                    title: "Urgent",
                    class: "red white--text",
                },
            }
        }
    },
    methods: {
        getArea(item) {
            if (item.area?.range) {
                return item.area.range.map(num => num + "SqFT").join(" - ")
            } else if (item.area?.exact) {
                return item.area?.exact + "SqFT"
            }
        },
        getPrice(item) {
            if (item.price?.range) {
                return item.price.range.map(cost => this.$currency(cost)).join(" - ")
            } else if (item.price?.exact) {
                return this.$currency(item.price.exact)
            } else if (item.price?.perMonth) {
                return this.$currency(item.price.perMonth) + "/month"
            }
        }
    }
}
</script>