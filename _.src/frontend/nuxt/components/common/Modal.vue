<template>
    <v-dialog @input="close" :value="open" v-bind="modalProps">
        <component :is="modal.component" @close="close" @dismiss="close" v-bind="modal.props" />
    </v-dialog>
</template>

<script>
import { omit } from "underscore";

export default {
    props: ["modal"],
    data() {
        return {
            open: true
        }
    },
    methods: {
        close(result) {
            this.$store.dispatch("modal/close", { spec: this.modal, result })
        }
    },
    computed: {
        modalProps() {
            return omit(this.modal, 'props', '$resolve', 'id', 'component')
        }
    }
};
</script>
