<template>
    <v-text-field v-model="phone" outlined hide-details placeholder="Phone Number" type="number" color="teal lighten-1"
        class="rounded-xl form-phone">
        <template #prepend-inner>
            <v-menu v-model="visible" @input="q = ''" offset-y max-height="50vh" :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs, value }">
                    <div v-bind="attrs" v-on="on" class="d-flex align-center gap-2">
                        <client-only>
                            <div class="form-phone-flag d-flex align-center" v-if="countryFlag" v-html="countryFlag">
                            </div>
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
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            countries: [],
            selectedCountry: { countryCode: "+62", code: "ID" },
            q: "",
            visible: false,
            phone: null
        }
    },
    computed: {
        countriesFiltered() {
            return this.countries.filter(item => !this.q?.length || item.name.toLowerCase().includes(this.q.toLowerCase()))
        },
        countryFlag() {
            if (process.client && this.selectedCountry?.code) {
                return window.CountryFlagSvg[this.selectedCountry.code]
            }
        },
        phoneWithCode() {
            return this.selectedCountry.countryCode + this.phone
        },
    },
    watch: {
        phoneWithCode(num) {
            this.$emit("input", num)
        }
    },
    mounted() {
        if (process.client) {
            this.countries = window.CountryList.getAll()
        }
    },
    methods: {
        pickCountryCode(item) {
            this.selectedCountry = item;
            this.visible = false;
        }
    }
}
</script>