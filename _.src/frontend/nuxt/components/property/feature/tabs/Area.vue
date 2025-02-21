<template>
    <div class="property-feature-tabs-area d-flex text-uppercase"
        :class="{ 'active-third-col': activeAreaModel.children }">
        <v-list class="pt-0">
            <v-list-item-group :value="true">
                <v-list-item :value="true" active-class="teal--text">
                    <v-list-item-content>
                        <v-list-item-title>area</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-list class="pt-0">
            <v-list-item-group v-model="filters.activeArea">
                <v-list-item @click="setArea(item)" v-for="(item, i) in areas" :key="i" :value="item.id"
                    active-class="teal--text">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-list class="pt-0">
            <v-list-item-group v-model="activeChildrenArea">
                <v-list-item @click="setArea(item)" v-for="(item, i) in activeAreaModel.children" :key="i"
                    :value="item.id" active-class="teal--text">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
export default {
    props: ["filters"],
    feature: {
        type: "filter",
        nodes: ["property-filters-dialog", "agents-search-results"],
        title: "Area",
        order: 0,
        activeTitle: "Bayan Lepas",
    },
    data() {
        return {
            areas: [
                {
                    "title": "no limit",
                    id: null
                },
                {
                    title: "Penang",
                    id: "penang",
                    children: [
                        {
                            title: "Geogetown",
                            id: "Geogetown",
                        },
                        {
                            title: "pulau tikus",
                            id: "pulau_tikus",
                        },
                        {
                            title: "bayan lepas",
                            id: "bayan_lepas",
                        },
                        {
                            title: "Ayer itam",
                            id: "Ayer_itam",
                        },
                        {
                            title: "tg tokong",
                            id: "tg_tokong",
                        },
                        {
                            title: "tg bunga",
                            id: "tg_bunga",
                        },
                    ]
                },
                {
                    title: "Selangor",
                    id: "selangor"
                },
                {
                    title: "Melaka",
                    id: "melaka"
                },
                {
                    title: "Johor",
                    id: "johor"
                },
                {
                    title: "Kuala lumpur",
                    id: "kuala_lumpur"
                }
            ],
            activeChildrenArea: null,
        }
    },
    computed: {
        activeAreaModel() {
            return this.areas.find(area => area.id === this.filters?.activeArea) || {}
        }
    },
    methods: {
        setArea(item) {
            this.$set(this.filters, 'area', item.id)
        }
    }
}
</script>