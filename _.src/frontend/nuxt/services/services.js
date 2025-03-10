import propertyService from "@/services/property"

class ServicesManager {
    getAll() {
        return Array(6).fill({
            title: "Variety Home and Office Cleaning Service",
            location: "Bandar Meru Raya, Ipoh, Perak",
            review: {
                rating: 4.1,
                allReviewsCount: 1340,
            },
            price: "90/hr ",
            agency: "ABC Cleaner Agency Sdn Bhd",
            agent: 1,
            img: '/service-preview.webp',
            listingCover: '/service-listing-cover.webp',
            updated: "2025-01-19T19:00:00.000Z",
            posters: Array(5).fill("/service-poster.webp"),
            description: "Hello dear vendors, purchasers & fellow investors, I am Visaghan Naidu from CBD Properties (Puchong) My area of focus would be in the Klang Valley and also Rawang which includes Kota Emerald, Bandar Country Homes, Saujana Rawang, and M-Residence. Feel free to contact me if you require any real estate related assistance and it would be my pleasure to provide you the best service  Cheers!"
        }).map((item, id) => ({ ...item, id }))
    }

    getAllReviews() {
        return Array(3).fill({
            author: "Name",
            text: "Satisfied!",
            date: "02/04/2024 18:30:00",
            stars: 4,
            img: '/review-avatar.svg'
        })
    }

    getSupplier(id) {
        return {
            name: "Savannah",
            surname: "Nguyen",
            verified: true,
            avatar: "/avatars/2.webp",
            agency: "ABC Cleaner Agency Sdn Bhd",
            license: "Agency Reg. No. E (1) 0572",
            experienceYears: "7 years",
            servicesCount: 3,
            about: "Hello dear vendors, purchasers & fellow investors, I am Visaghan Naidu from CBD Properties (Puchong) My area of focus would be in the Klang Valley and also Rawang which includes Kota Emerald, Bandar Country Homes, Saujana Rawang, and M-Residence. Feel free to contact me if you require any real estate related assistance and it would be my pleasure to provide you the best service  Cheers!",
            listing: propertyService.getProperties(),
            whatsapp: "+624525552424"
        }
    }
}

export default new ServicesManager()