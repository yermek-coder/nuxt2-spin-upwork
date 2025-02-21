<template>
    <div>
        <Modal v-for="modal in modals" :key="modal.id" :modal="modal"></Modal>
    </div>
</template>

<script>
export default {
    props: { options: Object },
    computed: {
        modals() {
            return this.$store.state.modal.modals
        }
    },
};
</script>
