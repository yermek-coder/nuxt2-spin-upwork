<template>
    <div class="agents-agent">
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs title="Agent">
                <div class="d-flex align-center gap-2 black--text">
                    <v-btn icon>
                        <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>
                    <v-btn @click="share" icon>
                        <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                </div>
            </Breadcrumbs>
        </v-container>

        <v-container class="mb-4">
            <v-img src="/agent-cover.webp" height="97" class="agents-agent-cover">
                <v-avatar size="88"><img :src="agent.avatar" :alt="agent.name"></v-avatar>
            </v-img>
        </v-container>

        <v-container class="mb-4">
            <div class="d-flex flex-column align-center">
                <div class="text-h6 mb-2">{{ agent.name + " " + agent.surname }}</div>
                <div class="d-flex gap-1">
                    <v-chip v-for="tag in agent.tags" :key="tag" small outlined>{{ tag }}</v-chip>
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="agents-agent-info">
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.experienceYears }}</span>
                    <span>Experiences</span>
                </div>
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.forSale }}</span>
                    <span>For Sale</span>
                </div>
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ agent.forRent }}</span>
                    <span>For Rent</span>
                </div>
            </div>
        </v-container>

        <v-container>
            <div class="d-flex gap-3 chip-tab-navigation">
                <v-chip v-for="item in tabs" :key="item.path" :to="{ name: item.name }"
                    exact-active-class="v-chip--exact-active teal--text" class="flex-grow-1 justify-center">
                    {{ item.title }}
                </v-chip>
            </div>
        </v-container>

        <NuxtChild v-bind="{ agent, listingCategoriesActive, listingCategories, properties }" />

        <v-sheet class="bottom-sheet elevation-10" outlined>
            <v-container class="pt-4 pb-2">
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
                        class="teal--text">privacy
                        policy</span>
                    and allow my
                    information to be shared with this agent who may contact me later.</p>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import agentService from '~/services/agent';
import propertyServices from "~/services/property"
import shareService from '~/services/share';

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
            shareService.showShareDialog({
                title: this.agent.name + " " + this.agent.surname,
                text: this.agent.about,
                url: window.location.href,
            })
        }
    }
}
</script>