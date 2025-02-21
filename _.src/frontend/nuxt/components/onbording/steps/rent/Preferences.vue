<template>
    <div class="d-flex gap-3 justify-center flex-wrap px-10">
        <v-chip @click="setLocation(item)" v-for="item in options" :key="item" :class="chipClass(item)"
            class="justify-center rounded-lg" outlined>
            {{ item }}
        </v-chip>
    </div>
</template>

<script>
import { without } from 'underscore';

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
            options: [
                "Residential + Commercial",
                "Gated and guarded community",
                "Close to MRT/LRT station",
                "Fully Furnished",
                "Nearby schools",
                "Nearby shopping malls",
                "With parking spaces",
                "Pet-friendly",
            ]
        }
    },
    methods: {
        chipClass(item) {
            return (this.form?.preferences || []).includes(item) && "teal--text teal lighten-3"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.preferences)) {
                if (this.form.preferences.includes(item)) {
                    this.form.preferences = without(this.form.preferences, item)
                } else {
                    this.form.preferences.push(item)
                }
            } else {
                this.$set(this.form, 'preferences', [])
                this.form.preferences.push(item)
            }
        }
    }
}
</script>