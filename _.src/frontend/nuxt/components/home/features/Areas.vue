<template>
    <div class="home-feature d-flex flex-column align-center gap-1">
        <Icon icon="globus" />
        <span class="home-feature-title text-body-4 text-uppercase font-weight-bold">Areas</span>
    </div>
</template>

<script>
export default {
    feature: {
        order: 700,
        type: "action",
        node: "home-top"
    },
}
</script>