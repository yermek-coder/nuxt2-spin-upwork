class AgentService {
    $modal;

    getAgents() {
        return [
            {
                id: 1,
                name: "Savannah",
                surname: "Nguyen",
                address: "Hit Property Sdn Bhd",
                tags: ["Sincere", "Helpful", "Featured"],
                verified: true,
                avatar: "/avatars/2.jpg",
                experienceYears: "< 1 yr",
                forSale: 30,
                forRent: 300,
                about: "Hello dear vendors, purchasers & fellow investors, I am Visaghan Naidu from CBD Properties (Puchong) My area of focus would be in the Klang Valley and also Rawang which includes Kota Emerald, Bandar Country Homes, Saujana Rawang, and M-Residence. Feel free to contact me if you require any real estate related assistance and it would be my pleasure to provide you the best service  Cheers!",
                services: [
                    "Sincere",
                    "Helpful",
                    "Featured",
                    "Apartment Rental",
                    "Landed House Rental",
                    "Mortgage Advisory",
                ],
                license: "Agency Reg. No. E (1) 0572",
            },
            ...Array(4).fill({
                id: 2,
                name: "Kristin",
                surname: "Watson",
                address: "Hit Property Sdn Bhd",
                tags: ["Sincere", "Helpful", "Featured"],
                verified: true,
                avatar: "/avatars/1.jpg",
                experienceYears: "< 1 yr",
                forSale: 30,
                forRent: 300,
                about: "Hello dear vendors, purchasers & fellow investors, I am Visaghan Naidu from CBD Properties (Puchong) My area of focus would be in the Klang Valley and also Rawang which includes Kota Emerald, Bandar Country Homes, Saujana Rawang, and M-Residence. Feel free to contact me if you require any real estate related assistance and it would be my pleasure to provide you the best service  Cheers!",
                services: [
                    "Sincere",
                    "Helpful",
                    "Featured",
                    "Apartment Rental",
                    "Landed House Rental",
                    "Mortgage Advisory",
                ],
                license: "Agency Reg. No. E (1) 0572",
            })
        ]
    }

    getAgent(id) {
        const list = this.getAgents()
        return list.find(item => item.id == id) || list[1]
    }

    openFilterDialog(filters) {
        return this.$modal({
            component: "AgentsFiltersDialog",
            props: { filters },
            contentClass: 'align-self-start ma-0 rounded-0',
            width: '100%',
            transition: "dialog-top-transition"
        })
    }
}

export default new AgentService()