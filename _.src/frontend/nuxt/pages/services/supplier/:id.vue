<template>
    <div class="agents-agent">
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs title="Supplier">
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
            <v-img src="/agent-cover.jpg" height="97" class="agents-agent-cover">
                <v-avatar size="88"><img :src="supplier.avatar" :alt="supplier.name"></v-avatar>
            </v-img>
        </v-container>

        <v-container>
            <div class="text-h6 text-center">{{ supplier.name + " " + supplier.surname }}</div>
            <div class="text-body-2 text--secondary text-center">{{ supplier.agency }}</div>
        </v-container>

        <v-container>
            <div class="agents-agent-info">
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ supplier.experienceYears }}</span>
                    <span>Experiences</span>
                </div>
                <div class="d-flex gap-1 flex-column align-center">
                    <span class="text-h6">{{ supplier.servicesCount }}</span>
                    <span>Services</span>
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

        <NuxtChild v-bind="{ supplier, listingCategoriesActive, listingCategories, properties }" />

        <v-sheet class="bottom-sheet elevation-10" outlined>
            <v-container class="pt-4 pb-2">
                <div class="d-flex flex-column mb-1">
                    <div class="agents-item d-flex gap-4 justify-space-between">
                        <v-avatar><img :src="supplier.avatar" alt="Avatar"></v-avatar>
                        <div class="d-flex flex-column">
                            <div class="d-flex align-center gap-2">
                                <span>{{ supplier.name + " " + supplier.surname }}</span>
                                <v-icon class="teal--text" small>mdi-check-circle</v-icon>
                            </div>
                            <div class="caption">{{ supplier.address }}</div>
                            <div class="caption">{{ supplier.agency }}</div>
                            <div class="caption">{{ supplier.license }}</div>
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
import serviceManager from '~/services/services';
import propertyServices from "~/services/property"
import shareService from '~/services/share';

export default {
    data() {
        return {
            supplier: serviceManager.getSupplier(this.$route.params.id),
            tab: null,
            tabs: [],
            listingCategoriesActive: [],
            listingCategories: [
                "All",
                "Cleaner",
                "Plumber",
                "Electrica",
            ],
            properties: propertyServices.getProperties(),
        }
    },
    created() {
        Promise.all((this.$routes.find(page => page.path === "/services/supplier/:id")?.children || []).map(async page => {
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
                title: this.supplier.name + " " + this.supplier.surname,
                text: this.supplier.about,
                url: window.location.href,
            })
        }
    }
}
</script>