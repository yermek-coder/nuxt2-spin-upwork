<template>
    <div :class="{ focus: focussed }" class="rte" />
</template>

<script>
import pell from "pell/dist/pell";
import api from "~/services/api";
import { IMAGE_TYPES } from '~/util'

const RTE_LINE_BLOCK = 'p';

const BUTTONS_DEFAULT = ["undo", "redo", "bold", "italic", "underline", "paragraph", "heading1", "heading2", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "ulist", "olist", "indent", "unindent", "uploadImage"];

const exec = pell.exec;
const queryCommandState = command => document.queryCommandState(command);

export default {
    name: "Rte",
    props: ["value", "buttons", "options", "autofocus"],
    data() {
        return { focussed: false, plugins: null, editor: null };
    },
    mounted() {
        // Init actions
        const actions = {
            undo: { title: "Undo", icon: '<i class="v-icon mdi mdi-arrow-u-left-top"></i>', result: () => exec("undo") },
            redo: { title: "Redo", icon: '<i class="v-icon mdi mdi-arrow-u-right-top"></i>', result: () => exec("redo") },
            bold: { title: "Bold", icon: '<i class="v-icon mdi mdi-format-bold"></i>', state: () => queryCommandState("bold"), result: () => exec("bold") },
            italic: { title: "Italic", icon: '<i class="v-icon mdi mdi-format-italic"></i>', state: () => queryCommandState("italic"), result: () => exec("italic") },
            strikeThrough: { title: "Strike-through", icon: '<i class="v-icon mdi mdi-format-strikethrough-variant"></i>', state: () => queryCommandState("strikeThrough"), result: () => exec("strikeThrough") },
            underline: { title: "Underline", icon: '<i class="v-icon mdi mdi-format-underline"></i>', state: () => queryCommandState("underline"), result: () => exec("underline") },
            heading1: { icon: '<i class="v-icon mdi mdi-format-header-1"></i>', title: "Heading 1", result: () => exec("formatBlock", "<h1>") },
            heading2: { icon: '<i class="v-icon mdi mdi-format-header-2"></i>', title: "Heading 2", result: () => exec("formatBlock", "<h2>") },
            paragraph: { icon: '<i class="v-icon mdi mdi-format-paragraph"></i>', title: "Paragraph", result: () => exec("formatBlock", `<${RTE_LINE_BLOCK}>`) },
            quote: { icon: '<i class="v-icon mdi mdi-format-quote-close"></i>', title: "Quote", result: () => exec("formatBlock", "<blockquote>") },
            olist: { icon: '<i class="v-icon mdi mdi-format-list-numbered"></i>', title: "Ordered List", result: () => exec("insertOrderedList") },
            ulist: { icon: '<i class="v-icon mdi mdi-format-list-bulleted"></i>', title: "Unordered List", result: () => exec("insertUnorderedList") },
            code: { icon: '<i class="v-icon mdi mdi-code-tags"></i>', title: "Code", result: () => exec("formatBlock", "<pre>") },
            indent: { icon: '<i class="v-icon mdi mdi-format-indent-increase"></i>', title: "Indent", result: () => exec("indent", `<${RTE_LINE_BLOCK}>`) },
            unindent: { icon: '<i class="v-icon mdi mdi-format-indent-decrease"></i>', title: "Unindent", result: () => exec("outdent") },
            justifyLeft: { icon: '<i class="v-icon mdi mdi-format-align-left"></i>', title: "Align left", result: () => exec("justifyLeft") },
            justifyCenter: { icon: '<i class="v-icon mdi mdi-format-align-center"></i>', title: "Align center", result: () => exec("justifyCenter") },
            justifyRight: { icon: '<i class="v-icon mdi mdi-format-align-right"></i>', title: "Align right", result: () => exec("justifyRight") },
            justifyFull: { icon: '<i class="v-icon mdi mdi-format-align-justify"></i>', title: "Align full", result: () => exec("justifyFull") },
            removeFormat: { icon: '<i class="v-icon mdi mdi-eraser"></i>', title: "Clear formatting", result: () => exec("removeFormat") },
            uploadImage: { icon: `<div><i class="v-icon mdi mdi-image-plus"></i><input id="rte-image-upload" accept="${IMAGE_TYPES}" type="file" /></div>`, title: "Add image", result: () => { } },
        };

        // Create editor
        this.editor = pell.init({
            element: this.$el,
            actions: (this.buttons || BUTTONS_DEFAULT).map(key => ({ ...actions[key], result: () => actions[key].result.call(this, { editor: this.editor, exec, queryCommandState }) })),
            defaultParagraphSeparator: RTE_LINE_BLOCK,
            classes: {
                button: "v-btn v-btn--icon v-size--small px-0 form-upload",
                actionbar: "pell-actionbar",
                selected: "active"
            },
            onChange: this.onChanged
        });

        // Hack: Disable tab index for buttons
        this.editor.querySelectorAll("button").forEach(el => (el.tabIndex = -1));

        // Event listeners
        this.editor.content.addEventListener("click", e => {
            if (e.target?.nodeName == "A" && e.target.href && e.target.getAttribute("target") == "_blank") {
                window.open(e.target.href);
            }
        });

        // Init
        this.editor.content.innerHTML = this.value || "";
        this.editor.content.setAttribute("placeholder", this.$attrs.placeholder || "");

        // Handle blur
        this.editor.content.addEventListener("blur", () => (this.blurTimeout = setTimeout(() => (this.focussed = false), 150)));
        this.editor.content.addEventListener("blur", this.onBlur);

        // Handle focus
        this.editor.content.addEventListener("focus", () => {
            // If focussed when blurring is in progress, quit blurring
            if (this.blurTimeout) {
                clearTimeout(this.blurTimeout);
                this.blurTimeout = null;
            }

            this.focussed = true;
        });

        // Handle paste of html
        this.editor.content.addEventListener("paste", e => {
            const files = e.clipboardData?.types?.includes("Files");
            if (files && e.clipboardData.types.includes("text/html")) {
                const item = e.clipboardData.items.find(ref => { ref.type === "text/html" });
                if (item) {
                    item.getAsString(str => exec("insertHTML", false, str));
                }
            }

            if (files) {
                e.preventDefault();
            }
        });

        if (this.autofocus) {
            this.editor.content.focus();
        }

        document.querySelector('#rte-image-upload').addEventListener("change", this.insertImage)
    },
    watch: {
        value(value) {
            if (value != this.editor.content.innerHTML) {
                this.editor.content.innerHTML = value || "";
            }
        },
        focussed(focus) {
            this.$emit(focus ? "focus" : "blur");
        }
    },
    beforeUnmount() {
        this.onUnmount();
    },
    methods: {
        focus(cursor = null) {
            this.editor?.content?.focus();
            if (cursor == "end" && this.editor?.content) {
                setTimeout(() => {
                    window.getSelection().selectAllChildren(this.editor.content);
                    window.getSelection().collapseToEnd();
                    this.editor.content.scrollTop = 9999;
                });
            }
        },
        onChanged() {
            // When text in changed
            this.commit();
        },
        onBlur() {
            // When editor lost focus
            this.commit();
        },
        onUnmount() {
            // When editor is unmounted
            this.commit();
            document.querySelector('#rte-image-upload').removeEventListener("change", this.insertImage)
        },
        commit() {
            const content = this.editor.content.innerHTML;
            if (content != this.value) {
                this.$emit("input", content);
            }
        },
        execCommand(...args) {
            exec(...args);
        },
        async insertImage(event) {
            // Focus first
            this.focus();

            // Upload image
            const formData = new FormData()
            formData.append("upload", event.target.files[0]);

            const imageUrl = (await this.$working(api.post("agent/ckeditor/upload.php", formData))).url;

            // Append image
            exec("insertHTML", `<img src="${imageUrl}" />`);

            event.target.value = null
        }
    }
};
</script>
