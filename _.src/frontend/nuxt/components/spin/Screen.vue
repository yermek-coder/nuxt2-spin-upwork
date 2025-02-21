<template>
    <v-container class="spin-screen">
        <v-row justify="center">
            <v-col cols="11">
                <div class="spin-screen-content">
                    <SpinHeader>{{ formatCoinsCount(settings.coinsCount) }}</SpinHeader>
                    <SpinWheel @win="$emit('win', $event)" :sections="settings.sections"
                        :multiplier="settings.multiplier" :spinsAvailable="settings.spinsAvailable" />
                    <div class="spin-screen-content-button-bottom">
                        <Icon icon="arrow-down" />
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ["settings"],
    methods: {
        formatCoinsCount(num) {
            num = typeof num === 'number' ? num : parseInt(num);
            return num.toLocaleString()
        }
    }
}
</script>