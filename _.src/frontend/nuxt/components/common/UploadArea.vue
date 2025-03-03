<template>
    <v-card outlined class="rounded-xl d-flex gap-3 py-12 align-center justify-center form-upload">
        <Icon icon="image" />
        <div class="d-flex gap-1 flex-column justify-center">
            <div class="text-body-2">
                <span class="teal--text">Upload</span> your document
            </div>
            <div class="text--secondary text-body-3">
                Maximum size {{ maxSize }}
            </div>
        </div>
        <input ref="thumbnailInput" @cancel.stop @change="$emit('change', $event)" :accept="types" type="file" />
    </v-card>
</template>

<script>
export default {
    props: {
        outlined: Boolean,
        types: Array,
        maxSize: String,
    }
}
</script>