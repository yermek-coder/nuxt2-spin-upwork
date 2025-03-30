<template>
    <div class="d-flex gap-1 align-center">
        <Icon icon="bathtub" />
        <span>{{ entity.bathroom }}</span>
    </div>
</template>

<script>
export default {
    props: ["entity"],
    feature: {
        type: "marker",
        node: "property-card-2",
        order: 200,
        supports: ({ entity }) => entity?.bathroom
    }
}
</script>