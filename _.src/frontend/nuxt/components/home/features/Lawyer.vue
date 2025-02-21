<template>
    <div class="home-feature d-flex flex-column align-center gap-1">
        <Icon icon="lawyer" />
        <span class="home-feature-title text-body-4 text-uppercase font-weight-bold">Lawyer</span>
    </div>
</template>

<script>
export default {
    feature: {
        order: 900,
        type: "action",
        node: "home-top"
    },
}
</script>