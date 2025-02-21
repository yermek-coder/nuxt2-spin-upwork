<template>
    <div class="voucher-page">
        <v-container class="pb-0 mb-3 white">
            <div class="d-flex align-center gap-3 py-4">
                <v-btn @click="$router.go(-1)" icon small>
                    <v-icon color="black">mdi-chevron-left</v-icon>
                </v-btn>
                <h4 class="text-uppercase">Voucher</h4>
            </div>
        </v-container>

        <v-container v-if="voucher">
            <v-img src="/voucher.jpg" class="mb-4"></v-img>

            <div class="d-flex flex-column gap-3">
                <div class="text-h5">{{ voucher.title }}</div>
                <div>
                    <v-chip class="teal--text teal lighten-4">{{ voucher.points }}pts</v-chip>
                </div>
                <div class="subtitle-2">FREE Credit redeemed: {{ voucher.free }}pts</div>
                <div class="text-body-4">{{ voucher.about }}</div>
            </div>
        </v-container>

        <v-container class="d-flex voucher-page-bottom-button">
            <v-btn @click="reward" x-large class="elevation-0 teal lighten-1 white--text flex-grow-1">Redeem +100
                points</v-btn>
        </v-container>
    </div>
</template>

<script>
import voucherService from '~/services/voucher';

export default {
    route: { title: "Voucher" },
    computed: {
        voucher() {
            return voucherService.getVouchers().find(item => item.id == this.$route.params.id)
        }
    },
    methods: {
        reward() {
            this.$modal({
                component: "SuccessDialog",
                props: {
                    title: this.voucher.title,
                    description: `Congratulation you got ${this.voucher.title}. You can use this voucher based on the T&C.`,
                },
                fullscreen: true
            })
        }
    }
}
</script>