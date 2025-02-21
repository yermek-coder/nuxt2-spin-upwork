<template>
    <RewardScreen :config="config" />
</template>

<script>
export default {
    data() {
        return {
            config: {
                rewards: [
                    { type: "coins", amount: 25, date: '2025-01-25T14:47:13.373Z', collected: true },
                    { type: "coins", amount: 50, date: '2025-01-26T14:47:13.373Z', collected: true },
                    { type: "coins", amount: 100, date: '2025-01-27T14:47:13.373Z', collected: true },
                    { type: "coins", amount: 200, date: '2025-01-28T14:47:13.373Z' },
                    { type: "coins", amount: 300, date: '2025-01-29T14:47:13.373Z' },
                    { type: "coins", amount: 500, date: '2025-01-30T14:47:13.373Z' },
                    { type: "coins", amount: 1000, date: '2025-01-31T14:47:13.373Z' },
                ],
                achievementStep: 2,
                progress: {
                    current: 12,
                    range: [0, 30],
                    steps: [
                        {
                            value: 0,
                            title: "1",
                        },
                        {
                            value: 8,
                            title: "8",
                            icon: "chest-wood"
                        },
                        {
                            value: 15,
                            title: "15",
                            icon: "chest-blue"
                        },
                        {
                            value: 22,
                            title: "22",
                            icon: "chest-purple"
                        },
                        {
                            value: 30,
                            title: "30",
                            icon: "chest-gold"
                        }
                    ]
                },
            }
        }
    }
}
</script>