<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-img src="/decorations/credit-bg.svg" class="white--text text-center pt-5">
            <div class="text-body-3 mb-1">Credit Balance</div>
            <div class="text-h3 mb-1">3,888</div>
            <div class="text-body-4 mb-8">Last update on dec 24, 2024</div>

            <v-row class="px-6">
                <v-col v-for="item in links" :key="item.title" cols="4">
                    <NuxtLink :to="item.path" class="d-flex flex-column align-center">
                        <div class="mb-3 rounded-xl white d-flex pa-3">
                            <Icon :icon="item.icon" />
                        </div>
                        <span class="text-body-3">{{ item.title }}</span>
                    </NuxtLink>
                </v-col>
            </v-row>
        </v-img>

        <v-container>
            <div class="text-h6">Rewards</div>
            <v-chip-group v-model="activeCategory" mandatory class="mb-1">
                <v-chip v-for="item in categories" :key="item" :value="item" active-class="teal--text"
                    class="flex-grow-1 justify-center">{{ item }}</v-chip>
            </v-chip-group>

            <v-row dense>
                <v-col v-for="(item, idx) in rewards" :key="idx" cols="6">
                    <v-card class="rounded-xl overflow-hidden d-flex flex-column" outlined>
                        <div class="pa-1">
                            <v-img :src="item.cover" height="126" class="rounded-xl rounded-b-0"></v-img>
                            <div class="subtitle-2">{{ item.title }}</div>
                            <div class="text--secondary text-body-4">{{ item.credits }} credits</div>
                        </div>
                        <v-btn color="primary" class="elevation-0 rounded-0 white--text flex-grow-1">Redeem</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    route: { title: "Credit" },
    data() {
        return {
            categories: [
                "All",
                "Food & Beverage",
                "Travel",
                "Tech",
            ],
            activeCategory: null,
            rewards: Array(6).fill({
                title: "Zus RM8 Cash Voucher",
                cover: "/reward-cover.webp",
                credits: 300
            })
        }
    },
    computed: {
        links() {
            return this.$routes
                .filter(route => route.parent === "/credit" && route.component?.route && !route.component?.route?.hidden)
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: component?.route?.title || name.split("-").pop(), path, icon: component?.route?.icon, }))
        }
    }
}
</script>