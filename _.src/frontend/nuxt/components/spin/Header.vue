<template>
    <div class="spin-header-wrapper">
        <div class="spin-header">
            <Icon icon="coin" class="spin-header-icon" />
            <span class="spin-header-info urbanist-white-shadow urbanist-bold">
                <slot />
            </span>
        </div>
    </div>
</template>

<style>
.spin {
    padding: 2rem;
}

.spin-header-wrapper {
    margin-inline: auto;
    padding-left: 0.9rem;
    width: fit-content;
}

.spin-header {
    padding-right: 1rem;
    padding-left: 20px;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    width: fit-content;
}

.spin-header-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-45%, -50%);
}

.spin-header-info {
    text-align: center;
}
</style>