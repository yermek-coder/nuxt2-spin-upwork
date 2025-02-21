<template>
    <Icon v-if="type === 'coins'" icon="coin-stack" />
    <IconGem v-else color="#7600CD" />
</template>

<script>
export default {
    props: ["type"]
}
</script>