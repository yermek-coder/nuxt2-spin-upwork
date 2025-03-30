<template>
    <v-card outlined class="rounded-xl d-flex gap-3 py-12 align-center justify-center form-upload image-upload-area">
        <Icon icon="image" />
        <div class="d-flex gap-1 flex-column justify-center">
            <div v-if="fileName" class="text-body-2">{{ fileName }}</div>
            <template v-else>
                <div class="text-body-2">
                    <span class="teal--text">Upload</span> your {{ type }}
                </div>
                <div class="text--secondary text-body-3">
                    Maximum size {{ maxSize }}
                </div>
            </template>
        </div>
        <input ref="thumbnailInput" @cancel.stop @change="onChange" :accept="types" type="file" />
    </v-card>
</template>

<script>
export default {
    props: {
        type: String,
        value: Object | String | null,
        outlined: Boolean,
        maxSize: String,
        types: Array,
    },
    data() {
        return {
            fileName: ""
        }
    },
    methods: {
        onChange(event) {
            this.$emit('change', event);
            this.$emit('input', event.target.files[0]);
            this.fileName = event.target.files[0].name
            event.target.value = null;
        }
    }
}
</script>