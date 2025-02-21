<template>
    <div class="credit-my-rewards">
        <v-container class="pb-0 mb-3 white">
            <div class="d-flex align-center gap-3 py-4">
                <v-btn @click="$router.push('/credit')" icon small>
                    <v-icon color="black">mdi-chevron-left</v-icon>
                </v-btn>
                <h4 class="text-uppercase">My rewards</h4>
            </div>
        </v-container>

        <v-container>
            <v-card outlined class="rounded-pill d-flex pa-1 grey lighten-3 credit-my-rewards-nav">
                <v-chip v-for="item in links" :key="item.path" :class="pillClass(item)" large
                    class="flex-grow-1 justify-center">
                    <NuxtLink :to="item.path">
                        {{ item.title }}
                    </NuxtLink>
                </v-chip>
            </v-card>
        </v-container>

        <NuxtChild />
    </div>
</template>

<script>
export default {
    route: {
        title: "My Rewards",
        icon: "cardholder",
    },
    middleware({ redirect, route }) {
        if (route.name === 'credit-my-rewards') {
            redirect('/credit/my-rewards/active')
        }
    },
    data() {
        return {
            category: "Active rewards",
            catergories: [
                "Active rewards",
                "Past rewards",
            ],
            links: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            const page = this.$routes.find(route => route.name === "credit-my-rewards")
            const children = await Promise.all(page.children.map(async item => {
                return ({ ...item, component: await item.component() })
            }))
            this.links = children
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: component.route?.title, name, path, icon: component.route.icon, }))
        },
        pillClass(item) {
            if (item.name === this.$route.name) {
                return "teal lighten-1 white--text"
            } else {
                return "grey--text grey lighten-3"
            }
        }
    }
}
</script>