<template>
    <div class="agents-agent">
        <v-container class="pb-0 mb-3 white">
            <div class="d-flex align-center justify-space-between gap-3 py-4">
                <v-btn to="/agents" icon small>
                    <v-icon color="black">mdi-chevron-left</v-icon>
                </v-btn>
                <div class="text-h7 font-weight-medium">Agent</div>
                <div class="d-flex align-center gap-2 black--text">
                    <v-btn icon>
                        <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>
                    <v-btn @click="share" icon>
                        <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-container>

        <v-container class="mb-4">
            <v-img src="/agent-cover.jpg" height="97" class="agents-agent-cover">
                <v-avatar size="88"><img :src="agent.avatar" :alt="agent.name"></v-avatar>
            </v-img>
        </v-container>

        <v-container class="mb-4">
            <div class="d-flex flex-column align-center">
                <div class="text-h6 mb-2">{{ agent.name }}</div>
                <div class="d-flex gap-1">
                    <v-chip v-for="tag in agent.tags" :key="tag" small outlined>{{ tag }}</v-chip>
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="d-flex gap-4 align-center justify-space-between">
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.experienceYears }}</span>
                    <span>Experiences</span>
                </div>
                <v-divider vertical></v-divider>
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.forSale }}</span>
                    <span>For Sale</span>
                </div>
                <v-divider vertical></v-divider>
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.forRent }}</span>
                    <span>For Rent</span>
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="d-flex gap-3">
                <v-chip v-for="item in tabs" :key="item.path" :to="{ name: item.name }" exact-active-class="teal--text"
                    class="flex-grow-1 justify-center">
                    {{ item.title }}
                </v-chip>
            </div>
        </v-container>

        <NuxtChild v-bind="{ agent, listingCategoriesActive, listingCategories, properties }" />
    </div>
</template>

<script>
import agentService from '~/services/agent';
import propertyServices from "~/services/property"

export default {
    data() {
        return {
            agent: agentService.getAgent(this.$route.params.id),
            tab: null,
            tabs: [],
            listingCategoriesActive: [],
            listingCategories: [
                "All",
                "Commercial",
                "High Rise",
                "Landed",
            ],
            properties: propertyServices.getProperties(),
        }
    },
    created() {
        Promise.all((this.$routes.find(page => page.path === "/agents/:id")?.children || []).map(async page => {
            return ({ ...page, component: await page.component() })
        })).then(pages => {
            this.tabs = pages
                .sort((a, b) => (a.component.route.order > b.component.route.order ? 1 : -1))
                .map(({ path, component, name }) => ({ title: component.route.title, path, name }))
        })
    },
    methods: {
        share() {
            if (navigator?.share) {
                navigator.share({
                    title: this.agent.name + " " + this.agent.surname,
                    text: this.agent.about,
                    url: window.location.href,
                })
            } else {
                this.$modal({ component: "ShareDialog", props: { link: window.location.href }, width: 343 })
            }
        }
    }
}
</script>