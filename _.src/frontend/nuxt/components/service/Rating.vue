<template>
    <div v-if="full" class="d-flex">
        <v-rating :value="service.review.rating" readonly color="yellow" empty-icon="mdi-star" background-color="grey"
            length="5" size="14" dense></v-rating>
        <div class="d-flex align-center gap-1 text-body-4">
            <div>{{ service.review.rating }}</div>
            <div>({{ service.review.allReviewsCount }})</div>
        </div>
    </div>
    <div v-else class="d-flex align-center gap-1 text-body-4">
        <v-icon class="yellow--text text-body-2">mdi-star</v-icon>
        <div>{{ service.review.rating }}</div>
        <div>({{ service.review.allReviewsCount }})</div>
    </div>
</template>

<script>
export default {
    props: {
        service: Object,
        full: {
            type: Boolean,
            default: false
        }
    }
}
</script>