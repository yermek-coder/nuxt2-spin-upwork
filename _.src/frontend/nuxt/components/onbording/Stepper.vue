<template>
    <div class="d-flex gap-3 align-center justify-center">
        <template v-for="(step, idx) in steps">
            <div class="d-flex flex-column gap-3 align-center" :key="step">
                <Icon :icon="step.toLowerCase()" />
                <div>{{ step }}</div>
            </div>
            <v-icon v-if="idx < (steps.length - 1)">mdi-arrow-right</v-icon>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                "Upload",
                "Verify",
                "Assign",
                "Publish",
            ]
        }
    }
}
</script>