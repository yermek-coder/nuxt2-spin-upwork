<template>
    <div class="d-flex gap-3 justify-center flex-wrap px-10">
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
        order: 400,
        title: "Do you have any specific preferences?",
        description: "(Multiple choices allowed)"
    },
    data() {
        return {
            options: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            this.options = await this.$working(propertyService.getPropertyTags(), true)
        },
        chipClass(item) {
            return (this.form?.preferences || []).includes(item.text) && "primary--text primary"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.preferences)) {
                if (this.form.preferences.includes(item.text)) {
                    this.form.preferences = without(this.form.preferences, item.text)
                } else {
                    this.form.preferences.push(item.text)
                }
            } else {
                this.$set(this.form, 'preferences', [])
                this.form.preferences.push(item.text)
            }
        }
    }
}
</script>