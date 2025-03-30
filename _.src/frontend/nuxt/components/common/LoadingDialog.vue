<template>
    <v-card class="loading-dialog">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-card>
</template>

<script>
export default {
    props: ["promise", "title", "text"],
    mounted() {
        if (this.promise instanceof Promise) {
            this.promise.catch(err => this.$emit("dismiss", err)).then(result => this.$emit("close", result));
        } else {
            this.$nextTick(() => this.$emit("close", this.promise))
        }
    }
};
</script>
