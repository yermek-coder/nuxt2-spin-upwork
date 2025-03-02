<template>
    <div>
        <v-container>
            <v-card class="white pa-4 rounded-xl elevation-0 mb-16">
                <div class="text-h7 font-weight-medium mb-2">Active Listing</div>
                <v-chip-group :value="listingCategoriesActive" @input="$emit('input:listingCategoriesActive', $event)"
                    mandatory>
                    <v-chip v-for="item in listingCategories" :key="item" :value="item" active-class="teal--text"
                        class="flex-grow-1 justify-center">{{ item }}</v-chip>
                </v-chip-group>
                <div class="properties-list properties-list-single-col pb-12">
                    <PropertyCard v-for="(item, index) in properties" :key="index" :property="item" horizontal />
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ["supplier", "listingCategoriesActive", "listingCategories", "properties"],
    route: {
        title: "Listings",
        order: 200,
    }
}
</script>