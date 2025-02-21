<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container class="py-0">
            <SearchField />
        </v-container>

        <v-container>
            <v-chip-group>
                <v-chip @click="openFilter" v-for="(feature, index) in features" :key="index"
                    active-class="teal--text text-lighten-2" :class="{ 'teal--text': afterSearch }" outlined>
                    {{ afterSearch ? feature.activeTitle : feature.title }}
                    <v-icon>mdi-chevron-down</v-icon>
                </v-chip>
            </v-chip-group>
        </v-container>

        <v-container>
            <div class="d-flex flex-column gap-4">
                <template v-for="(item, idx) in agents">
                    <AgentsItem :key="idx" :agent="item" />
                    <v-divider v-show="idx < (agents.length - 1)"></v-divider>
                </template>
            </div>
        </v-container>
    </div>
</template>

<script>
import agentService from '~/services/agent';
import featureService from '~/services/feature';

export default {
    route: { title: "Search results" },
    data() {
        return {
            category: null,
            categories: ['Top Lister', 'Featured'],
            agents: agentService.getAgents(),
            filters: {},
            afterSearch: false
        }
    },
    computed: {
        features() {
            return featureService.getFeatures("filter", { node: "agents-search-results", filters: this.filters })
        }
    },
    methods: {
        async openFilter() {
            const result = await agentService.openFilterDialog(this.filters)
            if (result) {
                this.afterSearch = true
            }
        }
    }
}
</script>