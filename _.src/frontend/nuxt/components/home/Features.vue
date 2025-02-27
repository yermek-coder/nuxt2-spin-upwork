<template>
    <v-container>
        <Swipable :links="links" />
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    icon: 'search',
                    title: 'Area',
                    url: "#",
                },
                {
                    icon: 'banknote',
                    title: 'Calculator',
                    url: "#",
                },
                {
                    icon: 'buildings',
                    title: 'Condos',
                    url: "#",
                },
                {
                    icon: 'favorite',
                    title: 'Luxury',
                    url: "#",
                },
                {
                    icon: 'house-blue',
                    title: 'Affordable',
                    url: "#",
                },
                {
                    icon: 'renovation',
                    title: 'Renov',
                    url: "#",
                },
                {
                    icon: 'kid',
                    title: 'Agent',
                    url: "/agents",
                },
                {
                    icon: 'globus',
                    title: 'Areas',
                    url: "#",
                },
                {
                    icon: 'live',
                    title: 'Live',
                    url: "#",
                },
                {
                    icon: 'lawyer',
                    title: 'Lawyer',
                    url: "#",
                },
            ],
        }
    }
}
</script>