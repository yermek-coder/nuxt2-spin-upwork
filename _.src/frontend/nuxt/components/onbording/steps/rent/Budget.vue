<template>
    <div class="px-10">
        <ScrollPicker v-model="currentValue" :options="options" />
    </div>
</template>

<script>
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
            currentValue: "RM 300k - RM 400k",
            options: [
                "RM 100k - RM 200k",
                "RM 200k - RM 300k",
                "RM 300k - RM 400k",
                "RM 400k - RM 500k",
                "RM 500k - RM 600k",
            ]
        }
    },
}
</script>