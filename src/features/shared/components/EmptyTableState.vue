<template>
    <div v-if="!isLoading" class="flex flex-col items-center justify-center p-8">
        <i :class="[icon, 'text-4xl text-gray-400 mb-4']"></i>
        <span class="text-xl font-bold text-gray-600 mb-2">{{ title }}</span>
        <span class="text-gray-500 text-sm">{{ description }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'Brak danych'
    },
    description: {
        type: String,
        default: 'Nie znaleziono żadnych rekordów do wyświetlenia.'
    },
    icon: {
        type: String,
        default: 'pi pi-users'
    },
    isLoading: {
        type: Boolean,
        default: false 
    }
});
</script>