<template>
    <div class="d-flex gap-4 flex-column px-16">
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
        order: 200,
        title: "What type of house do you prefer?",
        description: "(Multiple choices allowed)",
    },
    data() {
        return {
            options: [
                "Apartment/Flat",
                "Condominium",
                "Terrace House",
                "Semi-Detached House",
                "Bungalow",
            ]
        }
    },
    methods: {
        chipClass(item) {
            return (this.form?.houseType || []).includes(item) && "teal--text teal lighten-3"
        },
        setLocation(item) {
            if (Array.isArray(this.form?.houseType)) {
                if (this.form.houseType.includes(item)) {
                    this.form.houseType = without(this.form.houseType, item)
                } else {
                    this.form.houseType.push(item)
                }
            } else {
                this.$set(this.form, 'houseType', [])
                this.form.houseType.push(item)
            }
        }
    }
}
</script>