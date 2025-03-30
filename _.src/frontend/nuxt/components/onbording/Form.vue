<template>
    <v-form @submit.prevent="submit" class="onbording-form d-flex flex-column gap-4">
        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">State</span>
            <v-autocomplete v-model="form.state" :items="states" item-value="name" item-text="name" outlined
                hide-details placeholder="Please select state" color="primary" class="rounded-xl"></v-autocomplete>
        </div>

        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">Building Name</span>
            <v-autocomplete v-model="form.building" :items="buildings" item-value="value" item-text="text" outlined
                hide-details append-icon="" color="primary" placeholder="Search building name"
                class="rounded-xl"></v-autocomplete>
        </div>

        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">Full Address</span>
            <v-text-field v-model="form.address" outlined hide-details placeholder="Full Address" color="primary"
                class="rounded-xl" />
        </div>

        <!-- <v-select :items="items" outlined hide-details label="City" color="primary" class="rounded-xl" />
        <v-text-field outlined hide-details label="Residential Name" color="primary" class="rounded-xl" />
        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">Phone Number</span>
            <PhoneField v-model="phone" />
        </div>

        <v-text-field outlined hide-details label="Residential Name" color="primary" class="rounded-xl">
            <template #append>
                <span class="teal--text">Request</span>
            </template>
</v-text-field> -->

        <v-btn type="submit" x-large color="primary" class="white--text flex-grow-1">Confirm</v-btn>
    </v-form>
</template>

<script>
import propertyService from '~/services/property';
import onbordingService from '~/services/onbording';

export default {
    props: { type: String },
    data() {
        return {
            form: { user_id: 1 },
            states: [],
            buildings: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        async submit() {
            await onbordingService.submission(this.form)

            this.$modal({
                component: "SuccessDialog",
                props: {
                    title: "Submission Successfully!",
                    description: "Your submission has been successfully submitted. Our agent will contacting you soon.",
                },
                fullscreen: true,
            })
        },
        async init() {
            this.form.type = this.type
            this.states = await propertyService.getStates()
            this.buildings = await propertyService.getBuildings()
        }
    }
}
</script>