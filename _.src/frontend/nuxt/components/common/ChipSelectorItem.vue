<template>
    <v-chip @click="setValue(value)" :class="{ 'teal lighten-4 teal--text': model[property] === value }">
        <slot />
    </v-chip>
</template>

<script>
export default {
    props: {
        model: Object,
        value: String,
        property: String,
    },
    methods: {
        setValue(value) {
            this.$set(this.model, this.property, value)
        },
    }
}
</script>