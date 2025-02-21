<template>
    <v-container class="reward-screen">
        <v-row justify="center">
            <v-col cols="8">
                <div class="reward-screen-content">
                    <RewardTitle>Daily Bonus</RewardTitle>
                    <div class="reward-screen-content-text-gold urbanist-semi-bold">Come back tomorrow for more! </div>
                    <RewardSteps :value="config.achievementStep" />
                    <div class="reward-progress-card">
                        <RewardProgress :value="config.progress.current" :range="config.progress.range"
                            :steps="config.progress.steps" />
                    </div>
                    <v-container class="reward-progress-grid">
                        <v-row>
                            <v-col v-for="(item, idx) in config.rewards.slice(0, -1)" :key="idx" cols="4">
                                <RewardDayCard @click="collectReward(item)" :title="`Day ${idx + 1}`"
                                    :info="item.amount && `x${item.amount}`" :active="isToday(item.date)"
                                    :passive="inFuture(item.date)" :checked="item.collected">
                                    <RewardDayCardIcon :type="item.type" />
                                </RewardDayCard>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container>
                        <v-row justify="center">
                            <v-col cols="3" class="reward-screen-content-line" />
                            <v-col cols="3" class="reward-screen-content-last-day urbanist-extra-bold">Day 7</v-col>
                            <v-col cols="3" class="reward-screen-content-line" />
                        </v-row>
                    </v-container>
                    <v-container class="reward-progress-grid">
                        <v-row justify="center">
                            <v-col cols="4">
                                <RewardDayCard @click="collectReward(lastDayReward)" :info="`x${lastDayReward.amount}`"
                                    :active="isToday(lastDayReward.date)" :passive="inFuture(lastDayReward.date)"
                                    :checked="lastDayReward.collected">
                                    <RewardDayCardIcon :type="lastDayReward.type" />
                                </RewardDayCard>
                            </v-col>
                        </v-row>
                    </v-container>
                    <div class="reward-screen-content-timer"><span class="urbanist-medium">Next reward in </span><span
                            class="urbanist-extra-bold">{{ timerDate }}</span></div>
                    <div class="reward-screen-content-call urbanist-extra-bold">Tap to Collect</div>
                </div>

                <RewardDialog v-model="showReward" :reward="reward" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const MINUTE = 1000 * 60;
const DAY = MINUTE * 60 * 24;

function getDateId(date) {
    return date ? Math.floor(new Date(date).getTime() / DAY) : 0;
}

export default {
    props: {
        config: Object,
    },
    data() {
        return {
            interval: null,
            timerDate: "00 : 00 : 00",
            showReward: false,
            reward: {}
        }
    },
    computed: {
        lastDayReward() {
            return this.config.rewards[this.config.rewards.length - 1]
        },
        nextRewardDate() {
            const todayRewardIdx = this.config.rewards.findIndex(reward => this.isToday(reward.date))
            if (todayRewardIdx >= 0 && this.config.rewards[todayRewardIdx + 1]) {
                return new Date(this.config.rewards[todayRewardIdx + 1].date)
            }
        }
    },
    mounted() {
        this.interval = setInterval(this.timer, 1000)
    },
    beforeDestroy() {
        clearInterval(this.interval);
        this.interval = null;
    },
    methods: {
        timer() {
            if (this.nextRewardDate) {
                const now = new Date();
                const diffMs = this.nextRewardDate - now;
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
                this.timerDate = [hours, minutes, seconds].map(num => num.toString().padStart(2, "0")).join(" : ")
            } else {
                this.timerDate = "00 : 00 : 00"
            }
        },
        collectReward(reward) {
            if (!reward.collected) {
                this.reward = reward;
                this.showReward = true;
                this.$emit("reward", reward)
            }
        },
        isToday(date) {
            return getDateId(date) === getDateId(new Date())
        },
        inFuture(date) {
            return getDateId(date) > getDateId(new Date())
        }
    }
}
</script>