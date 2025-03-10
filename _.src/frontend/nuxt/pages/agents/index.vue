<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container class="py-3">
            <form @submit.prevent="submit">
                <SearchField />
            </form>
        </v-container>

        <v-container class="agents-featured">
            <div class="subtitle-1 font-weight-bold mb-3">Featured Agency</div>

            <v-card outlined class="rounded-xl">
                <div class="subtitle-1 font-weight-bold ma-2 text-uppercase teal--text">
                    <v-icon class="teal--text">mdi-shield-check</v-icon>
                    Trusted Agency
                </div>
                <v-divider></v-divider>
                <div class="pa-4">
                    <div class="agents-featured-card-grid gap-4">
                        <v-img v-for="idx in 10" :key="idx" :src="`/agencies/agency_${idx}.webp`">
                        </v-img>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="text-uppercase text-center pa-3 font-weight-bold">view all</div>
            </v-card>
        </v-container>

        <v-container>
            <div class="subtitle-1 font-weight-bold mb-3">Agent List</div>
            <v-chip-group v-model="category" mandatory active-class="teal--text">
                <v-chip value="top" class="flex-grow-1 justify-center">Top Lister</v-chip>
                <v-chip value="featured" class="flex-grow-1 justify-center">Featured</v-chip>
            </v-chip-group>

            <div class="d-flex flex-wrap gap-4">
                <v-card v-for="category in categories" :key="category" class="pa-3 white flex-grow-1" outlined>
                    <div class="subtitle-1 font-weight-bold mb-2">{{ category }}</div>
                    <div class="d-flex flex-column gap-4">
                        <template v-for="(item, idx) in agents">
                            <AgentsItem :key="idx" :agent="item" />
                            <v-divider v-show="idx < (agents.length - 1)"></v-divider>
                        </template>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
import agentService from '~/services/agent';

export default {
    route: { title: "Agents" },
    data() {
        return {
            category: null,
            categories: ['Top Lister', 'Featured'],
            agents: agentService.getAgents()
        }
    },
    methods: {
        submit() {
            this.$router.push("/agents/search-results")
        }
    }
}
</script>