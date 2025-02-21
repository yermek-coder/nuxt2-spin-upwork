<template>
    <v-form @submit.prevent="submit" class="onbording-form d-flex flex-column gap-4">
        <v-select :items="items" outlined hide-details label="City" color="teal lighten-1" class="rounded-xl" />
        <v-text-field outlined hide-details label="Residential Name" color="teal lighten-1" class="rounded-xl" />
        <div class="d-flex flex-column gap-2">
            <span class="text--secondary text-body-3">Phone Number</span>
            <v-text-field outlined hide-details placeholder="Phone Number" type="number" max color="teal lighten-1"
                class="rounded-xl onbording-form-phone">
                <template #prepend-inner>
                    <v-menu v-model="visible" @input="q = ''" offset-y max-height="50vh"
                        :close-on-content-click="false">
                        <template v-slot:activator="{ on, attrs, value }">
                            <div v-bind="attrs" v-on="on" class="d-flex align-center gap-2">
                                <client-only>
                                    <div class="onbording-form-phone-flag d-flex align-center" v-if="countryFlag"
                                        v-html="countryFlag"></div>
                                    <span class="text--secondary">{{ selectedCountry.countryCode }}</span>
                                </client-only>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                        </template>
                        <v-card>
                            <v-text-field v-model="q" outlined autofocus hide-details clearable
                                color="teal lighten-1"></v-text-field>
                            <v-list>
                                <v-list-item @click="pickCountryCode(item)" v-for="(item, index) in countriesFiltered"
                                    :key="index">
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </template>
            </v-text-field>
        </div>

        <v-text-field outlined hide-details label="Residential Name" color="teal lighten-1" class="rounded-xl">
            <template #append>
                <span class="teal--text">Request</span>
            </template>
        </v-text-field>

        <v-btn type="submit" x-large color="teal lighten-1" class="white--text flex-grow-1">Confirm</v-btn>
    </v-form>
</template>

<script>
export default {
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            countries: [],
            selectedCountry: { countryCode: "+62", code: "ID" },
            q: "",
            visible: false
        }
    },
    computed: {
        countriesFiltered() {
            return this.countries.filter(item => !this.q.length || item.name.toLowerCase().includes(this.q.toLowerCase()))
        },
        countryFlag() {
            if (process.client && this.selectedCountry?.code) {
                return window.CountryFlagSvg[this.selectedCountry?.code]
            }
        }
    },
    mounted() {
        if (process.client) {
            this.countries = window.CountryList.getAll()
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
        pickCountryCode(item) {
            this.selectedCountry = item;
            this.visible = false;
        }
    }
}
</script>