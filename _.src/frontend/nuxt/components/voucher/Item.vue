<template>
    <NuxtLink :to="`/voucher/${voucher.id}`" class="rounded-xl white d-flex voucher-item"
        :class="{ passive: voucher.past }">
        <div class="flex-grow-1 d-flex flex-column pa-4 gap-3">
            <div class="subtitle-1">{{ voucher.title }}</div>
            <div class="text-body-2 text--secondary">{{ voucher.description }}</div>
            <div class="d-flex gap-2 align-center">
                <v-icon>mdi-calendar-month-outline</v-icon>
                <div class="text-body-3">Expired {{ voucher.expired }}</div>
                <v-btn :disabled="voucher.past" class="teal lighten-1 white--text elevation-0" x-small>Use
                    Now</v-btn>
            </div>
        </div>
        <div class="voucher-item-divider"></div>
        <div class="d-flex flex-column align-center pa-4 gap-3">
            <v-img :src="voucher.img" width="43" contain></v-img>
            <v-btn v-if="voucher.multiplier"
                class="teal lighten-4 teal--text elevation-0 font-weight-bold text-body-3 text-lowercase" height="26"
                width="26" fab x-small>x{{
                    voucher.multiplier }}</v-btn>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: ["voucher"]
}
</script>