<template>
    <div class="px-10">
        <ScrollPicker v-model="currentValue" :options="options" />
    </div>
</template>

<script>
const optionsMap = {
    "RM 100k - RM 200k": { min: 100000, max: 200000 },
    "RM 200k - RM 300k": { min: 200000, max: 300000 },
    "RM 300k - RM 400k": { min: 300000, max: 400000 },
    "RM 400k - RM 500k": { min: 400000, max: 500000 },
    "RM 500k - RM 600k": { min: 500000, max: 600000 },
}

const optionsKeys = Object.keys(optionsMap)

export default {
    props: ["form"],
    feature: {
        type: "step",
        nodes: ["onbording-rent", "onbording-buy"],
        order: 100,
        title: "What is your budget for buying a house?",
        componentClass: "mt-n10"
    },
    data() {
        return {
            currentValue: optionsKeys[2],
            options: optionsKeys
        }
    },
    created() {
        this.onValueChange(this.currentValue)
    },
    watch: {
        currentValue(value) {
            this.onValueChange(value)
        }
    },
    methods: {
        onValueChange(value) {
            if (!this.form?.budget) {
                this.$set(this.form, "budget", { min: 0, max: 0 })
            }
            this.form.budget = optionsMap[value]
        }
    }
}
</script>