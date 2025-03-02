<template>
    <!-- <div :class="['full-rte-' + view, style?.rte]" @click="onClick" class="full-rte">
        <div v-if="!toolbarContainer && !style?.disabled" class="toolbar" :class="style?.toolbar" :id="editorId"></div>
        <Editor :disabled="style?.disabled" @blur="onBlur" v-model="content" :tinymceScriptSrc :init="options"
            class="editor" :class="style?.editor" />
    </div> -->
    <Editor :tinymceScriptSrc="tinymceScriptSrc" :init="{
        plugins: 'lists link image table code help wordcount'
    }" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
    components: { Editor },
    data() {
        return {
            tinymceScriptSrc: "https://cheerful-twilight-91c4c1.netlify.app/js/tinymce/tinymce.min.js",
        }
    }
}
</script>

<!-- <script>
// @ts-check
import { ref, watch, computed, inject } from "vue";

const $i18n = inject("$i18n");

// Init emits and props
const emit = defineEmits(["update:modelValue", "focus", "blur"]);
const props = defineProps({
    modelValue: String,
    buttons: String,
    view: { type: String, default: "adaptive" },
    placeholder: String,
    toolbarContainer: String,
    toolbarPersist: { type: Boolean, default: true }
});

// Constants
const tinymceScriptSrc = "https://smartchat-tinymce.netlify.app/6.8.2/js/tinymce/tinymce.min.js";

// Styles
const styles = {
    adaptive: {
        editor: "form-control",
        toolbar: "form-control"
    },
    fill: {
        rte: "pane",
        toolbar: "pane-item",
        editor: "pane-body"
    },
    stretch: {
        editor: "form-control",
        toolbar: "form-control"
    },
    inlinestretch: {
        toolbar: "form-control"
    },
    readonly: {
        editor: "form-control",
        toolbar: "form-control",
        disabled: true
    }
};

const style = computed(() => styles[props.view]);

// Init
const editorId = `toolbar-${uuid()}`;
const options = {
    inline: true,
    forced_root_block: RTE_LINE_BLOCK,
    toolbar_persist: props.toolbarPersist,
    fixed_toolbar_container: "#" + (props.toolbarContainer || editorId),
    language: config.locale === "en" ? null : config.locale,
    entity_encoding: "raw",
    plugins: "code image link table pagebreak nonbreaking anchor lists",
    toolbar: props.buttons || RTE_FULL_DEFAULT_BUTTONS,
    style_formats: [
        { title: `${$i18n("heading")} 1`, format: "h3" },
        { title: `${$i18n("heading")} 2`, format: "h4" },
        { title: `${$i18n("heading")} 3`, format: "h5" },
        { title: "Paragraph", format: RTE_LINE_BLOCK },
        { title: $i18n("blockquote"), format: "blockquote" },
        { title: "Smaller", format: "h6" },
        { title: "Very small", block: RTE_LINE_BLOCK, styles: { fontSize: "7pt" } }
    ],
    table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
    placeholder: props.placeholder,
    images_upload_handler: blobInfo => {
        return new Promise(async (resolve, reject) => {
            try {
                const image = await imageService.uploadImage(blobInfo.blob());
                const imageUrl = entityService.attachmentUrl(image, "image");
                resolve(imageUrl);
            } catch (error) {
                reject($i18n("flash_uploading_errors"));
            }
        });
    },
    image_caption: true,
    statusbar: false,
    menubar: false,
    quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    skin: "oxide",
    // content_css: "adaptive"
};

// Text Conversion: Incoming
function convertIn(html) {
    return imageService.renderImages(html);
}

// Text Conversion: Outgoing
function convertOut(html) {
    return imageService.parseImages(cleanHtmlStyles(linksToHrefs(html || "")));
}

const content = ref(convertIn(props.modelValue || ""));

// Commit changes
function commit() {
    if (content.value != props.modelValue) {
        emit("update:modelValue", convertOut(content.value));
    }
}

// Handle link clicks
function onClick(e) {
    if (e.target?.closest("a") && e.target.href && e.target.getAttribute("target") === "_blank") {
        window.open(e.target.href);
    }
}

// Handle blur
function onBlur(e) {
    // Commit only on tinymce blur events and ignore native blur events
    if (!(e instanceof Event)) {
        commit();
    }
}

// Watch for props changes
watch(
    () => props.modelValue,
    function () {
        if (props.modelValue !== content.value) {
            content.value = convertIn(props.modelValue || "");
        }
    }
);
</script> -->
