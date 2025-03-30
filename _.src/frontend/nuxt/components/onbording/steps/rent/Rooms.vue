<template>
    <div class="d-flex gap-3 flex-wrap justify-center px-10">
        <v-chip @click="setRooms(item)" v-for="item in 5" :key="item" :class="chipClass(item)"
            class="justify-center rounded-lg" outlined>
            {{ item === 1 ? item + ' Room' : item + ' Rooms' }}
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
    methods: {
        chipClass(item) {
            return (this.form?.rooms || []).includes(item) && "primary--text primary"
        },
        setRooms(item) {
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