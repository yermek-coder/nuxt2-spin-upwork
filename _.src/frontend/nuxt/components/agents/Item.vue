<template>
    <NuxtLink :to="'/agents/' + agent.id" class="agents-item d-flex gap-4">
        <v-avatar><img :src="agent.avatar" alt="Avatar"></v-avatar>
        <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex align-center gap-2">
                <span>{{ agent.name + " " + agent.surname }}</span>
                <v-icon class="teal--text" small>mdi-check-circle</v-icon>
            </div>
            <div class="caption mb-1">{{ agent.address }}</div>
            <div class="d-flex gap-1">
                <v-chip v-for="tag in agent.tags.slice(0, 2)" :key="tag" small outlined>{{ tag }}</v-chip>
                <v-chip small outlined>+1</v-chip>
            </div>
        </div>
        <div class="d-flex gap-2">
            <v-btn fab class="elevation-0" small>
                <Icon icon="chat" />
            </v-btn>
            <v-btn fab class="elevation-0 green white--text" small>
                <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: ["agent"]
}
</script>