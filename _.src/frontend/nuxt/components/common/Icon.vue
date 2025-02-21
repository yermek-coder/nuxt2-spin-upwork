<template>
    <component :is="iconComponent" v-if="iconComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            iconComponent: null,
        };
    },
    async created() {
        try {
            const iconModule = await import(`~/static/icons/${this.icon}.svg?inline`);
            this.iconComponent = defineAsyncComponent(() => Promise.resolve(iconModule.default));
        } catch (error) {
            console.error(`Failed to load icon: ${this.icon}`, error);
            this.iconComponent = null;
        }
    }
};
</script>