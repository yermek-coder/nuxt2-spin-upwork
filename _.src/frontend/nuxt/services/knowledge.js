class KnowledgeService {
    getArticles() {
        return [
            {
                id: 1,
                minutesRead: 6,
                title: "Solo Travel: Embrace Freedom Abroad",
                location: "Sunway Velocity,KL",
                cover: "/article-card-cover-1.jpg",
                coverFull: "/article-cover-full.jpg",
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem suscipit convallis.',
                category: "Finance",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                },
                created: new Date().toISOString()
            },
            {
                id: 2,
                minutesRead: 6,
                title: "Road Tripping: Unforgettable Adventures On Wheels",
                location: "Sunway Velocity,KL",
                cover: "/article-card-cover-2.jpg",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                },
                created: new Date().toISOString()
            },
            {
                id: 3,
                minutesRead: 6,
                title: "Capturing Moments: Travel Photography Tips",
                location: "Sunway Velocity,KL",
                cover: "/article-card-cover-3.jpg",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                },
                created: new Date().toISOString()
            }
        ]
    }

    getMyArticles() {
        return Array(3).fill({
            id: 1,
            tags: ["New Property"],
            state: "published",
            minutesRead: 6,
            title: "Shop-office at Bandar Meru Raya",
            location: "Sunway Velocity,KL",
            cover: "/article-cover-2.jpg",
            coverFull: "/article-cover-full.jpg",
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem suscipit convallis.',
            category: "Finance",
            author: {
                name: "RYAN REYFORD",
                avatar: "/author-avatar.jpg"
            },
            updated: new Date().toISOString(),
            modified: new Date().toISOString(),
            commentsCount: 23,
            likesCount: "1K",
            shareCount: 100,
        })
    }

    getArticle(id) {
        return this.getArticles()[0]
    }

    getMyArticle(id) {
        return {
            id: 1,
            tags: ["New Property"],
            state: "published",
            minutesRead: 6,
            title: "Homes for sale in remote parts of Britain – in pictures",
            location: "Sunway Velocity,KL",
            cover: "/article-cover-2.jpg",
            coverFull: "/article-cover-full.jpg",
            content: `
                <p>In 2001, two agricultural barns were refashioned into two homes, with separate entrances, but one connecting internal door. Whitehouse Barns has been run as holiday lets (planning restrictions mean it has to be unoccupied for 45 days a year between January and March) but could form one large,</p>
                <p>eight-bedroom lateral home. They both have four bedrooms and an open-plan kitchen-living space all set in 1 acre, with decking on to the River Blyth. Walberswick and Southwold (think beach hut-lined promenade) are a short drive away. £950,000. The Modern House, 020 3795 5920</p>
                <img src="http://localhost:3000/article-cover-full-2.jpg">
                <h3>Ardentinny, Argyll and Bute</h3>
                <p>eight-bedroom lateral home. They both have four bedrooms and an open-plan kitchen-living space all set in 1 acre, with decking on to the River Blyth. Walberswick and Southwold (think beach hut-lined promenade) are a short drive away. £950,000. The Modern House, 020 3795 5920</p>
            `,
            category: "Finance",
            author: {
                name: "RYAN REYFORD",
                avatar: "/author-avatar.jpg"
            },
            updated: new Date().toISOString(),
            modified: new Date().toISOString(),
            commentsCount: 23,
            likesCount: "1K",
            shareCount: 100,
        }
    }

    getVideos() {
        return [
            {
                duration: "7:30",
                title: "How Much Home Loan Can You Get Based On Your Salary In Malaysia?",
                location: "Sunway Velocity,KL",
                cover: "/video-preview-1.jpg",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                }
            },
            {
                title: "Real Property Gains Tax (RPGT) In Malaysia, And Why It's So Important!",
                location: "Sunway Velocity,KL",
                duration: "5:45",
                cover: "/video-preview-2.jpg",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                }
            },
            {
                title: "New B40 Income Classifications And 2 Housing Schemes To Check Out",
                location: "Sunway Velocity,KL",
                duration: "4:20",
                cover: "/video-preview-3.jpg",
                author: {
                    name: "RYAN REYFORD",
                    avatar: "/author-avatar.jpg"
                }
            }
        ]
    }
}

export default new KnowledgeService()