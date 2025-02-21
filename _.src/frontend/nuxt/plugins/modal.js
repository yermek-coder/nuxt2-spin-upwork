export default function ({ store }, inject) {
    inject("modal", options => store.dispatch("modal/open", options))
}