class ShareService {
    $modal;

    showShareDialog(sharedEntity) {
        if (navigator?.share) {
            navigator.share(sharedEntity)
        } else {
            this.$modal({ component: "ShareDialog", props: { link: sharedEntity.url }, width: 343 })
        }
    }
}

export default new ShareService()