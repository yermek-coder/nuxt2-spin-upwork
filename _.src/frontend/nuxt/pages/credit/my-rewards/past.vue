<template>
    <v-container>
        <div class="reward-item d-flex flex-column gap-3">
            <VoucherItem v-for="(item, idx) in rewards" :key="idx" :voucher="item" class="rounded-xl white d-flex" />
        </div>
    </v-container>
</template>

<script>
export default {
    route: {
        title: "Past rewards",
        order: 100,
    },
    data() {
        return {
            rewards: [
                {
                    id: 4,
                    title: "Watson RM8 Cash Voucher",
                    description: "Maximum discount up to RM8",
                    expired: "Oct 21, 2024",
                    img: "/vouchers/brand4.png",
                    past: true
                }
            ]
        }
    }
}
</script>