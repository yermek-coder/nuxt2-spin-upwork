export default function ({ store }, inject) {
    inject("modal", options => store.dispatch("modal/open", options))

    inject("working", (promise, persistent = false) => store.dispatch("modal/open", { component: "LoadingDialog", props: { promise }, persistent }))
}