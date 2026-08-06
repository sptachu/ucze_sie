<template>
    <div class="flex flex-col items-center justify-center p-8">
        <i class="pi pi-spin pi-spinner text-4xl text-purple-500 mb-4"></i>
        <span class="text-xl font-bold text-gray-600">{{ message }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    message: {
        type: String,
        default: 'Pobieranie danych...'
    }
});
</script>