<template>
    <SpinScreen :settings="settings" />
</template>

<script>
export default {
    data() {
        return {
            settings: {
                sections: [
                    { color: '#FE0E73', amount: 200, type: "coins", probability: 10 },
                    { color: '#7815FC', amount: 300, type: "coins", probability: 10 },
                    { color: '#FE0E73', amount: 400, type: "coins", probability: 10 },
                    { color: '#7815FC', amount: 500, type: "coins", probability: 10 },
                    { color: '#FE0E73', amount: 600, type: "coins", probability: 10 },
                    { color: '#7815FC', amount: 700, type: "coins", probability: 10 },
                    { color: '#FE0E73', amount: 800, type: "coins", probability: 10 },
                    { color: '#7815FC', amount: 1000, type: "coins", probability: 10 },
                ],
                coinsCount: 24384585,
                spinsAvailable: 3,
                winnerColor: "#2FFFFF"
            }
        };
    },
}
</script>