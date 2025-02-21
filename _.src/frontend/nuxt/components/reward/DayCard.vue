<template>
    <a @click="$emit('click')" class="reward-day-card" :class="{ active, passive }">
        <span class="reward-day-card-title urbanist-extra-bold urbanist-shadow">{{ title }}</span>
        <span class="reward-day-card-body">
            <slot />
        </span>
        <span class="reward-day-card-info">
            <RewardBadge v-if="checked">
                <Icon icon="check" />
            </RewardBadge>
            <span v-else class="urbanist-bold reward-day-card-info-text urbanist-white-shadow">{{ info }}</span>
        </span>
    </a>
</template>

<script>
export default {
    props: {
        title: String,
        active: Boolean,
        checked: Boolean,
        passive: Boolean,
        info: String,
    }
}
</script>
