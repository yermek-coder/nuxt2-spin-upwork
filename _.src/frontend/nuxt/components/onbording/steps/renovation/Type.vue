<template>
    <div class="d-flex gap-3 justify-center flex-wrap px-4">
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
        nodes: ["onbording-renovate"],
        order: 0,
        title: "What type of renovation are you planning ?",
        description: "(Multiple choices allowed)"
    },
    data() {
        return {
            options: [
                "Entire House",
                "Partial House",
                "Living Room",
                "Dining Room",
                "Kitchen",
                "Bathroom",
                "Bedroom",
                "Roof Top",
            ]
        }
    },
    methods: {
        chipClass(item) {
            return (this.form?.type || []).includes(item) && "primary--text primary"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.type)) {
                if (this.form.type.includes(item)) {
                    this.form.type = without(this.form.type, item)
                } else {
                    this.form.type.push(item)
                }
            } else {
                this.$set(this.form, 'type', [])
                this.form.type.push(item)
            }
        }
    }
}
</script>