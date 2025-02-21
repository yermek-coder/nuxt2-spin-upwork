<template>
    <div class="home-feature d-flex flex-column align-center gap-1">
        <Icon icon="live" />
        <span class="home-feature-title text-body-4 text-uppercase font-weight-bold">Live</span>
    </div>
</template>

<script>
export default {
    feature: {
        order: 800,
        type: "action",
        node: "home-top"
    },
}
</script>