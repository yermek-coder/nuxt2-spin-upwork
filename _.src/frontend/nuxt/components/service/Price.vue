<template>
    <div>
        <span class="text--secondary text-body-4">from</span>
        <span class="text-body-2 teal--text font-weight-bold">{{ service.price }}</span>
    </div>
</template>

<script>
export default {
    props: ["service"]
}
</script>