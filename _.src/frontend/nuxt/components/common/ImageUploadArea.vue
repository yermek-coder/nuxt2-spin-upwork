<template>
    <v-card outlined :img="preview"
        class="rounded-xl d-flex gap-3 py-12 align-center justify-center form-upload image-upload-area">
        <Icon icon="image" />
        <div class="d-flex gap-1 flex-column justify-center">
            <div class="text-body-2">
                <span class="teal--text">Upload</span> your image
            </div>
            <div class="text--secondary text-body-3">
                Maximum size {{ maxSize }}
            </div>
        </div>
        <input ref="thumbnailInput" @cancel.stop @change="onChange" :accept="types" type="file" />
    </v-card>
</template>

<script>
import { IMAGE_TYPES } from '~/util'

export default {
    props: {
        value: Object | String | null,
        outlined: Boolean,
        maxSize: String,
    },
    data() {
        return {
            preview: this.value,
            types: IMAGE_TYPES,
        }
    },
    computed: {
        cardBg() {
            (this.value instanceof File || this.value instanceof Blob) ? this.preview : this.value
        }
    },
    watch: {
        value(file) {
            if (file instanceof File || file instanceof Blob) {
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.onload = event => {
                    this.preview = event.target.result
                }
            }
        }
    },
    methods: {
        onChange(event) {
            this.$emit('change', event);
            this.$emit('input', event.target.files[0]);
            event.target.value = null;
        }
    }
}
</script>