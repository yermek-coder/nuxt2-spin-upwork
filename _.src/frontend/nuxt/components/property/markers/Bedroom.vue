<template>
    <div class="d-flex gap-1 align-center">
        <Icon icon="bathtub" />
        <span>{{ entity.rooms.bedroom }}</span>
    </div>
</template>

<script>
export default {
    props: ["entity"],
    feature: {
        type: "marker",
        node: "property-card",
        order: 100,
        supports: ({ entity }) => entity?.rooms?.bedroom
    }
}
</script>