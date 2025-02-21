<template>
    <div class="reward-progress">
        <span class="reward-progress-meter" :style="{ width: progress + '%' }"></span>
        <RewardBadge v-for="item in steps" :key="item.value" class="reward-progress-step"
            :style="{ left: getProgress(item.value) + '%' }">
            <Icon icon="check" v-if="progress >= getProgress(item.value)" />
            <span v-else class="reward-progress-step-title urbanist-shadow urbanist-extra-bold">
                {{ item.title }}
            </span>
            <span v-if="item.icon" class="reward-progress-step-icon"
                :style="{ backgroundImage: `url(/icons/${item.icon}.svg)` }" />
        </RewardBadge>
    </div>
</template>

<script>
export default {
    props: {
        value: Number,
        range: Array,
        steps: Array
    },
    computed: {
        progress() {
            return this.getProgress(this.value)
        }
    },
    methods: {
        getProgress(ref) {
            return (ref * 100) / Math.abs(this.range[1] - this.range[0])
        }
    }
}
</script>
