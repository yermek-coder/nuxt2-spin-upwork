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

        <v-sheet class="bottom-sheet elevation-10">
            <v-container class="pt-4">
                <div class="d-flex flex-column mb-1">
                    <div class="agents-item d-flex gap-4 justify-space-between">
                        <v-avatar><img :src="agent.avatar" alt="Avatar"></v-avatar>
                        <div class="d-flex flex-column">
                            <div class="d-flex align-center gap-2">
                                <span>{{ agent.name + " " + agent.surname }}</span>
                                <v-icon class="teal--text" small>mdi-check-circle</v-icon>
                            </div>
                            <div class="caption">{{ agent.address }}</div>
                            <div class="caption">{{ agent.license }}</div>
                        </div>
                        <v-btn fab class="elevation-0" small>
                            <Icon icon="chat" />
                        </v-btn>
                        <v-btn fab class="elevation-0 green white--text" small>
                            <v-icon>mdi-whatsapp</v-icon>
                        </v-btn>
                    </div>
                </div>

                <p class="text-body-4 text--secondary mb-0">I confirm that I have read the <span
                        class="teal--color">privacy
                        policy</span>
                    and allow my
                    information to be shared with this agent who may contact me later.</p>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
export default {
    props: ["agent", "listingCategoriesActive", "listingCategories", "properties"],
    route: {
        title: "Listings",
        order: 200,
    }
}
</script>