<template>
    <div class="onbording-rent-steps-location d-flex gap-3 justify-center flex-wrap px-10">
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
        order: 0,
        title: "Where is your preferred location?",
        description: "(Maximum 3 locations)"
    },
    data() {
        return {
            options: [
                "Petaling Jaya",
                "Subang Jaya",
                "Kuala Lumpur",
                "Shah Alam",
                "Cheras",
            ]
        }
    },
    methods: {
        chipClass(item) {
            return (this.form?.locations || []).includes(item) && "teal--text teal lighten-3"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.locations)) {
                if (this.form.locations.includes(item)) {
                    this.form.locations = without(this.form.locations, item)
                } else {
                    this.form.locations.push(item)
                }
            } else {
                this.$set(this.form, 'locations', [])
                this.form.locations.push(item)
            }
        }
    }
}
</script>