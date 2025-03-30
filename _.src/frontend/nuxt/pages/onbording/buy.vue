<template>
    <div class="h-100vh d-flex flex-column">
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container v-if="activeStep">
            <div class="text-center mb-16">
                <div class="subtitle-1 font-weight-medium">{{ activeStep.title }}</div>
                <div v-if="activeStep.description" class="text-body-3 text--secondary">{{ activeStep.description }}
                </div>
                <v-divider class="mt-4"></v-divider>
            </div>

            <component :is="activeStep.component" :form="form" :class="activeStep.componentClass"></component>
        </v-container>

        <v-container class="mt-auto">
            <div class="d-flex gap-4">
                <v-btn @click="search" color="primary" x-large outlined>skip</v-btn>
                <v-btn @click="next" color="primary" x-large class="white--text flex-grow-1">next
                    step ({{ step + 1 }}/{{ features.length }})</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
import featureServices from '~/services/feature';
import { objectToHttpParams } from '~/util';

export default {
    route: {
        title: "I Want to Buy",
        order: 100,
        icon: "buy"
    },
    data() {
        return {
            step: 0,
            form: {
                type: "buy",
                state: [],
                budget:{
                    min: 100,
                    max: 400000
                },
                property_type: [],
                rooms: [],
                preferences: [],
            }
        }
    },
    computed: {
        features() {
            return featureServices.getFeatures("step", { node: "onbording-buy" })
        },
        activeStep() {
            return this.features[this.step]
        }
    },
    methods: {
        next() {
            if (this.step === this.features.length - 1) {
                this.search()
            }

            this.step = Math.min(this.features.length - 1, this.step + 1)
        },
        search() {
            this.$router.push({ path: '/home/search-results2?' + objectToHttpParams(this.form) })
        }
    }
}
</script>