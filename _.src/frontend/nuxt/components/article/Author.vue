<template>
    <div class="d-flex gap-2 align-center">
        <v-avatar size="24"><v-img :src="avatar"></v-img></v-avatar>
        <div class="text-truncate">by {{ name }}</div>
    </div>
</template>

<script>
export default {
    props: ["article"],
    computed: {
        name() {
            return this.article?.user?.name
        },
        avatar() {
            return this.article?.user?.avatar || '/author-avatar.webp'
        }
    }
}
</script>