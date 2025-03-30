<template>
    <div class="onbording-rent-steps-location d-flex gap-3 justify-center flex-wrap px-10">
        <v-chip @click="setLocation(state)" v-for="state in states" :key="state.state_id" :class="chipClass(state)"
            class="justify-center rounded-lg" outlined>
            {{ state.name }}
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
        order: 0,
        title: "Where is your preferred location?",
        description: "(Maximum 3 locations)"
    },
    data() {
        return {
            states: [],
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            this.states = await this.$working(propertyService.getStates(), true)
        },
        chipClass(item) {
            return (this.form?.state || []).includes(item.name) && "primary--text primary"
        },
        setLocation(item) {
            if ((this.form.state || []).length >= 3) {
                this.form.state.splice(0, 1)
            }

            if (Array.isArray(this.form?.state)) {
                if (this.form.state.includes(item.name)) {
                    this.form.state = without(this.form.state, item.name)
                } else {
                    this.form.state.push(item.name)
                }
            } else {
                this.$set(this.form, 'state', [])
                this.form.state.push(item.name)
            }
        }
    }
}
</script>