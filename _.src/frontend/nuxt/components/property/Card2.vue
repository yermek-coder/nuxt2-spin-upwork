<template>
    <v-card rounded="xl" :class="{ horizontal }" class="property-card elevation-0">
        <div class="property-card-image">
            <div v-if="badge" class="card-image-badge px-2 text-body-4 rounded-sm rounded-tl-0" :class="badge.class">
                <span :class="badge.class" class="card-image-badge-decor darken-3"></span>
                {{ badge.title }}
            </div>
            <v-img :src="property.cover_photo" height="145px" max-height="145px" width="140"
                :class="{ 'mb-3': !horizontal }" gradient="180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%"
                class="align-end rounded-xl">
                <button v-if="property.vr" class="property-card-button-vr px-2 py-1 rounded-xl d-flex">
                    <Icon icon="vr" />
                </button>
                <div class="white--text text-body-6 d-flex gap-1 align-center pa-2"><v-icon
                        class="white--text text-caption">mdi-map-marker</v-icon>
                    {{ property.state }}
                </div>
            </v-img>
        </div>
        <div class="property-card-body d-flex flex-column gap-2">
            <div class="text-body-3 px-2">
                <span class="font-weight-bold">{{ property.property_type + ". " }}</span>
                <span class="font-weight-medium">{{ property.title }}</span>
            </div>
            <div v-if="property.label" class="px-2 d-flex gap-1 flex-wrap">
                <v-chip x-small outlined class="px-1">
                    {{ property.label }}
                </v-chip>
            </div>
            <FeatureMarkers node="property-card-2" :entity="property" class="text-body-4 px-2 text--secondary" />
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
                hightlighted: {
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
    computed: {
        badge() {
            const keys = ['urgent', 'hightlighted', 'featured']
            const badge = Object.entries(this.property).filter(([key, value]) => keys.includes(key) && !!value)?.[0]?.[0]
            if (badge) {
                return propertyBadgeMap[badge]
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
            return this.$currency(item.price)
        }
    }
}
</script>