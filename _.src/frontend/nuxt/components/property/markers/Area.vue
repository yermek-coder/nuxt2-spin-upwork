<template>
    <div class="d-flex gap-1 align-center">
        <Icon icon="floorplan" />
        <span>{{ getArea(entity) }}</span>
    </div>
</template>

<script>
export default {
    props: ["entity"],
    feature: {
        type: "marker",
        node: "property-card",
        order: 300,
        supports: ({ entity }) => entity?.area
    },
    methods: {
        getArea(item) {
            if (item.area?.range) {
                return item.area.range.map(num => num + "SqFT").join(" - ")
            } else if (item.area?.exact) {
                return item.area?.exact + "SqFT"
            }
        },
    }
}
</script>