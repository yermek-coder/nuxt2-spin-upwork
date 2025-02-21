<template>
    <v-container>
        <div class="d-flex flex-column gap-3">
            <VoucherItem v-for="(item, idx) in rewards" :key="idx" :voucher="item" />
        </div>
    </v-container>
</template>

<script>
import voucherService from '~/services/voucher';

export default {
    route: {
        title: "Active rewards",
        order: 0
    },
    data() {
        return {
            rewards: voucherService.getVouchers()
        }
    }
}
</script>