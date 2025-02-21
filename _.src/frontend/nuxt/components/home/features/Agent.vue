<template>
    <NuxtLink to="/agents" class="home-feature d-flex flex-column align-center gap-1">
        <Icon icon="kid" />
        <span class="home-feature-title text-body-4 text-uppercase font-weight-bold">Agent</span>
    </NuxtLink>
</template>

<script>
export default {
    feature: {
        order: 600,
        type: "action",
        node: "home-top"
    },
}
</script>