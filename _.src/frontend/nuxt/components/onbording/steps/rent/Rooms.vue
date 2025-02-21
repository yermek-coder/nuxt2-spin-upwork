<template>
    <div class="d-flex gap-3 flex-wrap justify-center px-10">
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
        order: 300,
        title: "How many rooms do you prefer?",
        description: "(Multiple choices allowed)"
    },
    data() {
        return {
            options: [
                "1 Room",
                "2 Rooms",
                "3 Rooms",
                "4 Rooms",
                "5 Rooms",
            ]
        }
    },
    methods: {
        chipClass(item) {
            return (this.form?.rooms || []).includes(item) && "teal--text teal lighten-3"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.rooms)) {
                if (this.form.rooms.includes(item)) {
                    this.form.rooms = without(this.form.rooms, item)
                } else {
                    this.form.rooms.push(item)
                }
            } else {
                this.$set(this.form, 'rooms', [])
                this.form.rooms.push(item)
            }
        }
    }
}
</script>