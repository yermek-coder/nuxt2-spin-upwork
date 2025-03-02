<template>
    <v-container>
        <!-- Main Title -->
        <v-row>
            <v-col cols="12">
                <h1 class="text-h4 mb-4">Reward Configuration</h1>
            </v-col>
        </v-row>

        <v-form @submit.prevent="submit">
            <!-- Rewards Section -->
            <v-row>
                <v-col cols="12">
                    <h2 class="text-h6 mb-4">Rewards</h2>
                </v-col>
            </v-row>

            <!-- Dynamic Rewards Input -->
            <v-row v-for="(reward, index) in config.rewards" :key="index + reward.date + reward.amount">
                <v-col cols="12" md="3">
                    <v-text-field v-model="reward.type" label="Type" required></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-text-field v-model.number="reward.amount" label="Amount" type="number" min="0"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field :value="jsonDateToInputDate(reward.date)"
                        @input="reward.date = inputDateToJsonDate($event) || reward.date" label="Date"
                        type="datetime-local" required></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox v-model="reward.collected" label="Collected"></v-checkbox>
                </v-col>
            </v-row>

            <!-- Achievement Step -->
            <v-row>
                <v-col cols="12">
                    <h2 class="text-h6 mb-4">Achievement Step</h2>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model.number="config.achievementStep" label="Achievement Step" type="number" min="0"
                        required></v-text-field>
                </v-col>
            </v-row>

            <!-- Progress Section -->
            <v-row>
                <v-col cols="12">
                    <h2 class="text-h6 mb-4">Progress</h2>
                </v-col>
            </v-row>

            <!-- Current Progress -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.number="config.progress.current" label="Current Progress" type="number"
                        min="0" required></v-text-field>
                </v-col>
            </v-row>

            <!-- Progress Range -->
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="config.progress.range[0]" label="Range Start" type="number" min="0"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="config.progress.range[1]" label="Range End" type="number" min="0"
                        required></v-text-field>
                </v-col>
            </v-row>

            <!-- Progress Steps -->
            <v-row>
                <v-col cols="12">
                    <h2 class="text-h6 mb-4">Progress Steps</h2>
                </v-col>
            </v-row>

            <v-row v-for="(step, index) in config.progress.steps" :key="index">
                <v-row>
                    <v-col cols="12">
                        <h3 class="text-h6 mb-4">Step {{ index + 1 }}</h3>
                    </v-col>
                </v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="step.value" label="Step Value" type="number" min="0"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="step.title" label="Step Title" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model="step.icon" label="Step Icon"></v-text-field>
                </v-col>
            </v-row>

            <!-- Save Settings Button -->
            <v-row>
                <v-col cols="12">
                    <v-btn type="submit" color="primary">Save Configuration</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
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
                        { value: 0, title: "1" },
                        { value: 8, title: "8", icon: "chest-wood" },
                        { value: 15, title: "15", icon: "chest-blue" },
                        { value: 22, title: "22", icon: "chest-purple" },
                        { value: 30, title: "30", icon: "chest-gold" },
                    ],
                },
            },
        };
    },
    methods: {
        submit() {
            navigator.clipboard.writeText(JSON.stringify(this.config, undefined, 2))
            // You can add logic here to save the configuration to a server or local storage.
        },
        inputDateToJsonDate(date) {
            try {
                return new Date(date).toJSON() || null
            } catch (error) {
                return null
            }
        },
        jsonDateToInputDate(date) {
            try {
                return new Date(date).toISOString().slice(0, 16)
            } catch (error) {
                return null
            }
        },
    },
};
</script>
