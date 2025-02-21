<template>
    <Icon icon="gem-step-active" v-if="value" />
    <Icon icon="gem-step-passive" v-else />
</template>

<script>
export default {
    props: ["value"]
}
</script>