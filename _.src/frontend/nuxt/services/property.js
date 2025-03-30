import api from "./api";

const exampleProperties = [
    {
        title: "The Meg",
        category: "NEW",
        badge: "featured",
        tags: ["FREEHOLD", "Service Residence", "Completion Date : 2023"],
        area: {
            range: [563, 1200]
        },
        price: {
            range: [379440, 620000],
        },
        location: "Tanjung Tokong, Penang",
        preview: {
            src: "/home-card.webp"
        }
    },
    {
        title: "Shop-office at Bandar Meru Raya",
        category: "SUB",
        badge: "highlight",
        tags: ["FREEHOLD", "Built: 2023", "Commercial Residence"],
        area: {
            exact: 1200
        },
        price: {
            exact: 429000
        },
        rooms: {
            bathroom: 2,
            bedroom: 3,
        },
        location: "Tanjung Tokong, Penang",
        preview: {
            src: "/home-card.webp"
        },
        vr: true,
    },
    {
        title: "Shop-office at Bandar Meru Raya",
        category: "SUB",
        badge: "highlight",
        tags: ["FREEHOLD", "Built: 2023", "Commercial Residence"],
        area: {
            exact: 1200
        },
        price: {
            perMonth: 3000
        },
        rooms: {
            bathroom: 2,
            bedroom: 3,
        },
        location: "Tanjung Tokong, Penang",
        preview: {
            src: "/home-card.webp"
        },
        vr: true,
    },
]

const mockProperties = Array(3).fill(exampleProperties).flat()

class PropertyService {
    $modal;

    #propertyTagsCache;
    #propertyTypesCache;
    #stateCache;

    getProperties() {
        return mockProperties
    }

    async getPropertiesByFilters(filters) {
        return api.post("user/onboarding/search.php", { ...filters, "last_timestamp": null, "limit": 100 }).then(result => result?.data?.property || [])
    }

    openSearchDialog(props) {
        return this.$modal({
            component: "PropertyFiltersDialog",
            props,
            contentClass: 'align-self-start ma-0 rounded-0',
            width: '100%',
            transition: "dialog-top-transition"
        })
    }

    getStates() {
        return this.#stateCache || api.post("selection/get.php", { value: ["area-state"] }).then(data => {
            this.#stateCache = data.area.state;
            return data.area.state
        })
    }

    getBuildings() {
        return api.post("selection/get.php", { value: ["building"] }).then(data => data.building)
    }

    getPropertyTypes() {
        return this.#propertyTypesCache || api.post("selection/get.php", { value: ["propertycategory-high_rise"] }).then(data => {
            this.#propertyTypesCache = data.propertycategory;
            return data.propertycategory
        })
    }

    getPropertyTags() {
        return this.#propertyTagsCache || api.post("selection/get.php", { value: ["propertytag"] }).then(data => {
            this.#propertyTagsCache = data.propertytag;
            return data.propertytag
        })
    }
}

export default new PropertyService()