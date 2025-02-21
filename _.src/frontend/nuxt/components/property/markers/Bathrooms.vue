<template>
    <div class="d-flex gap-1 align-center">
        <Icon icon="bathtub" />
        <span>{{ entity.rooms.bathroom }}</span>
    </div>
</template>

<script>
export default {
    props: ["entity"],
    feature: {
        type: "marker",
        node: "property-card",
        order: 200,
        supports: ({ entity }) => entity?.rooms?.bathroom
    }
}
</script>