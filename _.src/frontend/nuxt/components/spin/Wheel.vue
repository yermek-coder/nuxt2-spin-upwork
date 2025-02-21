<template>
    <div class="wheel-root">
        <div class="wheel-container">
            <div class="wheel-wrapper" :class="{ 'spinning': isSpinning }" :style="{
                transform: `rotate(${currentRotation}deg)`,
                transition: spinTransition
            }">
                <canvas ref="wheelCanvas" :width="size" :height="size"></canvas>
                <div class="gradient-overlay"></div>
                <div class="border"></div>
                <div class="section-labels">
                    <div v-for="(section, index) in sections" :key="index" class="section-label"
                        :style="calculateLabelPosition(index)">
                        <span class="section-text urbanist-bold urbanist-white-shadow">x{{ section.amount }}</span>
                        <img :src="getIcon(section)" class="section-icon" />
                    </div>
                </div>
            </div>
            <div class="pointer">
                <Pointer />
            </div>
            <div class="knob">
                <Knob />
            </div>
        </div>
        <div class="multiplier urbanist-bold urbanist-white-shadow">x{{ spinsLeft }}</div>
        <div class="spins-left urbanist-extra-bold">{{ spinsLeftText }}</div>
        <button @click.stop="spinWheel" :disabled="!canSpin" class="spin-button urbanist-black">
            Spin Now
        </button>

        <RewardDialog v-model="showReward" :reward="reward" />
    </div>
</template>

<script>
import Knob from "~/static/decorations/knob.svg?inline"
import Pointer from "~/static/decorations/pointer.svg?inline"

export default {
    components: { Knob, Pointer },
    props: {
        size: {
            type: Number,
            default: 270,
        },
        sections: {
            type: Array,
            required: true,
        },
        spinsAvailable: Number,
        winnerColor: {
            type: String,
            default: '#2FFFFF'
        }
    },
    data() {
        return {
            currentRotation: 0,
            lastRotation: 0,
            ctx: null,
            isSpinning: false,
            spinTransition: '',
            spinsLeft: this.spinsAvailable,
            winningIndex: null,
            showReward: null,
            reward: {}
        };
    },
    computed: {
        canSpin() {
            return this.spinsLeft && !this.isSpinning
        },
        spinsLeftText() {
            if (this.spinsLeft === 1) {
                return `${this.spinsLeft} Spin Left`
            } else if (this.spinsLeft === 0) {
                return "No Spins Left"
            } else {
                return `${this.spinsLeft} Spins Left`
            }
        }
    },
    mounted() {
        this.ctx = this.$refs.wheelCanvas.getContext('2d');
        this.drawWheel();
    },
    methods: {
        calculateLabelPosition(index) {
            const { size, sections } = this;
            const sliceAngle = 360 / sections.length;
            const centerAngle = index * sliceAngle + sliceAngle / 2;
            const radius = size * 0.30;

            const angleInRadians = (centerAngle - 90) * (Math.PI / 180);
            const x = size / 2 + radius * Math.cos(angleInRadians);
            const y = size / 2 + radius * Math.sin(angleInRadians);

            return {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${centerAngle}deg)`,
            };
        },
        drawWheel() {
            const { ctx, size, sections } = this;
            const center = size / 2;
            const radius = size / 2;
            const sliceAngle = (2 * Math.PI) / sections.length;
            let startAngle = -Math.PI / 2;

            ctx.clearRect(0, 0, size, size);

            sections.forEach((section, index) => {
                const endAngle = startAngle + sliceAngle;

                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.arc(center, center, radius, startAngle, endAngle);

                // Use winnerColor for winning section, original color otherwise
                ctx.fillStyle = (index === this.winningIndex) ? this.winnerColor : section.color;
                ctx.fill();

                startAngle = endAngle;
            });
        },
        spinWheel() {
            const { sections } = this;
            const totalProbability = sections.reduce((sum, section) => sum + section.probability, 0);
            const random = Math.random() * totalProbability;
            let cumulativeProbability = 0;
            let selectedIndex = 0;

            for (let i = 0; i < sections.length; i++) {
                cumulativeProbability += sections[i].probability;
                if (random <= cumulativeProbability) {
                    selectedIndex = i;
                    break;
                }
            }

            // Reset previous winning section
            this.winningIndex = null;
            this.drawWheel();

            const sliceAngle = 360 / sections.length;
            const destinationAngle = -(selectedIndex * sliceAngle);
            const fullRotations = 360 * 5;

            const currentAngle = this.lastRotation % 360;
            const angleDiff = ((destinationAngle - currentAngle + 540) % 360) - 180;
            const randomOffset = Math.random() * (sliceAngle * 0.8);
            const targetRotation = this.lastRotation + fullRotations + angleDiff - randomOffset;

            this.isSpinning = true;
            this.spinsLeft -= 1;
            this.spinTransition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            this.currentRotation = targetRotation;

            setTimeout(() => {
                this.isSpinning = false;
                this.spinTransition = '';
                this.lastRotation = targetRotation;

                // Set winning section and redraw wheel
                this.winningIndex = selectedIndex;
                this.drawWheel();

                this.reward = sections[selectedIndex]
                this.showReward = true;
            }, 5000);
        },
        getIcon(section) {
            return section.type === "coins" ? "/icons/coin.svg" : "/icons/gem.svg"
        },
        showRewardDialog(section) {
            rewardService.showRewardDialog(section)
            this.$emit("win", section)
        }
    },
};
</script>