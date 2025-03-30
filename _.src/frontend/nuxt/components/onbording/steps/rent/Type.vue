<template>
    <div class="d-flex gap-4 flex-column px-16">
        <v-chip @click="setLocation(item)" v-for="item in options" :key="item.value" :class="chipClass(item)"
            class="justify-center rounded-lg" outlined>
            {{ item.text }}
        </v-chip>
    </div>
</template>

<script>
import { without } from 'underscore';
import propertyService from '~/services/property';

export default {
    props: ["form"],
    feature: {
        type: "step",
        nodes: ["onbording-rent", "onbording-buy"],
        order: 200,
        title: "What type of house do you prefer?",
        description: "(Multiple choices allowed)",
    },
    data() {
        return {
            options: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.options = await this.$working(propertyService.getPropertyTypes(), true)
        },
        chipClass(item) {
            return (this.form?.property_type || []).includes(item.text) && "primary--text primary"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.property_type)) {
                if (this.form.property_type.includes(item.text)) {
                    this.form.property_type = without(this.form.property_type, item.text)
                } else {
                    this.form.property_type.push(item.text)
                }
            } else {
                this.$set(this.form, 'property_type', [])
                this.form.property_type.push(item.text)
            }
        },
    }
}
</script>