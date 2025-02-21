<template>
    <v-dialog :value="value" @input="$emit('input', $event)" content-class="elevation-0 reward-collected-dialog-wrapper"
        :transition="false">
        <div class="reward-collected-dialog d-flex flex-column align-center justify-center">
            <div>
                <div class="reward-collected-dialog-body mb-6">
                    <div v-if="reward.type" class="reward-collected-dialog-card-reward-type urbanist-black">
                        {{ reward.type.toUpperCase() }}
                    </div>
                    <div class="reward-collected-dialog-card">
                        <Icon icon="coin-stack" class="reward-collected-dialog-card-icon" />
                        <div class="reward-collected-dialog-card-info urbanist-bold">x{{ reward.amount }}
                        </div>
                    </div>
                </div>
                <div class="reward-collected-dialog-message urbanist-extra-bold text-center mb-3">Congratulations</div>
            </div>
        </div>
    </v-dialog>
</template>

<script>
import confetti from "canvas-confetti";

export default {
    props: {
        reward: Object,
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value() {
            if (this.value) {
                setTimeout(() => {
                    confetti({
                        particleCount: 40,
                        spread: 90,
                        origin: { y: 0.5, x: 0.5 },
                        startVelocity: 35,
                        colors: ["#A267FF", "#1BBE6C", "#05BBDD", "#367BF2", "#FBD44D"],
                        zIndex: 201
                    });
                }, 400);
            }
        }
    }
}
</script>