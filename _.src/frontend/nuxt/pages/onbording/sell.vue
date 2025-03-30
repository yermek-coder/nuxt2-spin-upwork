<template>
    <div class="h-100vh d-flex flex-column">
        <v-container class="pb-0 mb-3 white">
            <Breadcrumbs />
        </v-container>

        <v-container>
            <OnbordingForm class="mb-6" type="sell" />
            <v-divider class="mb-5"></v-divider>

            <div class="text-h6 text-center mb-3">Selling Flow</div>
            <OnbordingStepper />
        </v-container>

        <v-container class="mt-auto">
            <div class="text--secondary text-body-3">After clicking "Confirm," our team will verify your property
                details and
                connect you
                with a local agent for sales services.
                MyEjen offers information and online technical support only.</div>
        </v-container>
    </div>
</template>

<script>
export default {
    route: {
        title: "I want to Sell",
        order: 400,
        icon: "sell"
    }
}
</script>