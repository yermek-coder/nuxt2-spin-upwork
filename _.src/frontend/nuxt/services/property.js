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
            src: "/home-card.jpg"
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
            src: "/home-card.jpg"
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
            src: "/home-card.jpg"
        },
        vr: true,
    },
]

const mockProperties = Array(3).fill(exampleProperties).flat()

class PropertyService {
    $modal;
    $router;

    getProperties() {
        return mockProperties
    }

    openSearchDialog(filters) {
        return this.$modal({
            component: "PropertyFiltersDialog",
            props: { filters },
            contentClass: 'align-self-start ma-0 rounded-0',
            width: '100%',
            transition: "dialog-top-transition"
        }).then(result => {
            result && this.$router.push("/home/search-results")
        })
    }
}

export default new PropertyService()