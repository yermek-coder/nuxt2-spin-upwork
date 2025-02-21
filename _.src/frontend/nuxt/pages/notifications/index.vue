<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container class="d-flex flex-column gap-4 pt-0">
            <div v-for="title in ['Today', 'Yesterday']" :key="title" class="d-flex flex-column gap-3">
                <div class="text-h6">{{ title }}</div>
                <v-card v-for="(item, idx) in notifications" :to="`/notifications/${item.id}`" :key="idx" outlined
                    class="elevation-0 rounded-xl d-flex gap-4 pa-4">
                    <div class="d-flex flex-column gap-3 flex-grow-1">
                        <span class="subtitle-1">{{ item.title }}</span>
                        <span class="text-body-4 text--secondary">{{ item.title }}</span>
                    </div>
                    <div class="d-flex flex-column gap-2">
                        <v-icon v-if="item.unread" class="text-body-4 red--text">mdi-circle</v-icon>
                        <div class="text-body-3">{{ item.date }}</div>
                    </div>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    route: {
        title: "Notification"
    },
    data() {
        return {
            notifications: [{
                title: "Zus RM8 Cash Voucher",
                description: "Maximum discount up to RM8",
                date: "2 Jul",
                id: 1,
                unread: true,
            },
            {
                title: "Zus RM8 Cash Voucher",
                description: "Maximum discount up to RM8",
                date: "2 Jul",
                id: 2,
                unread: true,
            },
            {
                title: "Zus RM8 Cash Voucher",
                date: "2 Jul",
                id: 3,
                unread: false,
                description: "Maximum discount up to RM8",
            }]
        }
    }
}
</script>