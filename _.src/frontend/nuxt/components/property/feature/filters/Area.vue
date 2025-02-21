<template>
    <ChipDropdown>
        <template #activator>Area</template>
        <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </ChipDropdown>
</template>

<script>
export default {
    feature: {
        type: "filter",
        nodes: ["subsales-properties"],
        order: 100,
    },
    props: ["filters"],
    data() {
        return {
            items: [
                { title: "Option 1" },
                { title: "Option 2" },
                { title: "Option 3" },
            ]
        }
    }
}
</script>