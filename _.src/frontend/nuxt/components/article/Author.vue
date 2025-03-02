<template>
    <div class="d-flex gap-2 align-center">
        <v-avatar size="24"><v-img :src="article.author.avatar"></v-img></v-avatar>
        <div class="text-truncate">by {{ article.author.name }}</div>
    </div>
</template>

<script>
export default {
    props: ["article"]
}
</script>