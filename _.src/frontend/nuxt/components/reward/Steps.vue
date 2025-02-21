<template>
    <div class="reward-steps">
        <RewardStep v-for="step in 3" :key="step" :value="step <= value" />
    </div>
</template>

<script>
export default {
    props: ["value"]
}
</script>
