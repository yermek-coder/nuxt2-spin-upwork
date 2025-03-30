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
    props: ["filters"],
    feature: {
        type: "filter",
        nodes: ["property-search-onbording"],
        order: 400,
        title: "Rooms",
    },
    methods: {
        chipClass(item) {
            return (this.filters?.rooms || []).includes(item) && "primary--text primary"
        },
        setRooms(item) {
            if (Array.isArray(this.filters?.rooms)) {
                if (this.filters.rooms.includes(item)) {
                    this.filters.rooms = without(this.filters.rooms, item)
                } else {
                    this.filters.rooms.push(item)
                }
            } else {
                this.$set(this.filters, 'rooms', [])
                this.filters.rooms.push(item)
            }
        }
    }
}
</script>