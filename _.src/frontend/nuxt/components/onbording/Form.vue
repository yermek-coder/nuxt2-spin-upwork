<template>
    <v-form @submit.prevent="submit" class="onbording-form d-flex flex-column gap-4">
        <v-select :items="items" outlined hide-details label="City" color="primary" class="rounded-xl" />
        <v-text-field outlined hide-details label="Residential Name" color="primary" class="rounded-xl" />
        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">Phone Number</span>
            <PhoneField v-model="phone" />
        </div>

        <v-text-field outlined hide-details label="Residential Name" color="primary" class="rounded-xl">
            <template #append>
                <span class="teal--text">Request</span>
            </template>
        </v-text-field>

        <v-btn type="submit" x-large color="primary" class="white--text flex-grow-1">Confirm</v-btn>
    </v-form>
</template>

<script>
export default {
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            phone: ""
        }
    },
    methods: {
        submit() {
            this.$modal({
                component: "SuccessDialog",
                props: {
                    title: "Submission Successfully!",
                    description: "Your submission has been successfully submitted. Our agent will contacting you soon."
                },
                fullscreen: true
            })
        },
    }
}
</script>