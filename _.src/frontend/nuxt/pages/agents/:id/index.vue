<template>
    <div>
        <v-container>
            <v-card class="white pa-4 rounded-xl elevation-0">
                <div class="text-h7 font-weight-medium mb-2">About {{ agent.name }}</div>
                <p class="text-body-2 mb-0">{{ agent.about }}</p>
            </v-card>
        </v-container>

        <v-container>
            <v-card class="white pa-4 rounded-xl elevation-0">
                <div class="text-h7 font-weight-medium mb-2">Specialities & Services</div>
                <div class="d-flex flex-wrap gap-2">
                    <v-chip v-for="tag in agent.services" :key="tag" outlined>{{ tag }}</v-chip>
                </div>
            </v-card>
        </v-container>

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
    props: ["agent", "listingCategoriesActive", "listingCategories", "properties"],
    route: {
        title: "About",
        order: 0,
    }
}
</script>