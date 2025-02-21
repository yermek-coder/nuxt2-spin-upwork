<template>
    <v-chip-group v-model="model" mandatory class="mb-3">
        <v-chip v-for="(category, index) in categories" :key="index" active-class="teal--text text-lighten-2">
            {{ category.title }}
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    props: {
        value: String | Number,
        categories: {
            type: Array,
            default: () => ([
                { title: "All", value: "all" },
                { title: "2 Parkings", value: "2_parkings" },
                { title: "Latest", value: "latest" },
                { title: "2 Bedrooms", value: "2_bedrooms" },
            ])
        }
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit("input", value)
            }
        },
    },
}
</script>