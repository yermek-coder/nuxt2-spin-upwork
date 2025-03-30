<template>
    <div class="d-flex gap-1 align-center">
        <Icon icon="floorplan" />
        <span>{{ entity.sqft }} SqFT</span>
    </div>
</template>

<script>
export default {
    props: ["entity"],
    feature: {
        type: "marker",
        node: "property-card-2",
        order: 300,
        supports: ({ entity }) => entity?.area
    },
}
</script>