<template>
    <div>
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container>
            <div class="d-flex flex-column gap-3">
                <div class="text-h5">RM 5 Cash Voucher</div>
                <div>
                    <v-chip class="teal--text teal lighten-4">100 pts</v-chip>
                </div>
                <div class="subtitle-2">FREE Credit redeemed : 30pts</div>
                <div class="text-body-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem
                    consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula
                    et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus
                    ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem
                    suscipit convallis.
                </div>
            </div>
        </v-container>

        <v-container class="d-flex voucher-page-bottom-button">
            <v-btn @click="reward" color="primary" x-large class="elevation-0 white--text flex-grow-1">Redeem +100
                points</v-btn>
        </v-container>
    </div>
</template>

<script>
export default {
    route: { title: "Details" },
    methods: {
        reward() {
            this.$modal({
                component: "SuccessDialog",
                props: {
                    title: "RM 5 Cash Voucher",
                    description: `Congratulation you got RM 5 Cash Voucher. You can use this voucher based on the T&C.`,
                },
                fullscreen: true
            })
        }
    }
}
</script>