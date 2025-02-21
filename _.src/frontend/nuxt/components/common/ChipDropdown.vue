<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs, value }">
            <v-chip v-bind="attrs" v-on="on" outlined>
                <span>
                    <slot name="activator" />
                </span>
                <v-icon class="ms-1">mdi-chevron-{{ value ? 'up' : 'down' }}</v-icon>
            </v-chip>
        </template>
        <slot />
    </v-menu>
</template>