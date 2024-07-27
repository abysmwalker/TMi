<!-- SlideButton.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const isActive = ref(false);

const emit = defineEmits<{
    (e: 'toggle-color', active: boolean): void
}>();

const toggle = () => {
    isActive.value = !isActive.value;
    emit('toggle-color', isActive.value);
};
</script>

<template>
    <div class="slide-button" :class="{ active: isActive }" @click="toggle">
        <div class="thumb"></div>
    </div>
</template>

<style scoped>
.slide-button {
    width: 60px;
    height: 30px;
    background-color: #ccc;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
}

.slide-button.active {
    background-color: #4caf50;
}

.thumb {
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
}

.slide-button.active .thumb {
    transform: translateX(30px);
}
</style>
