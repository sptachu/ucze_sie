<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal :header="dialogHeader" class="w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <div class="flex flex-col gap-4">
            
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-1 flex-1">
                    <label for="firstName" class="text-sm font-semibold">Imię</label>
                    <InputText id="firstName" v-model="localFormData.firstName" placeholder="np. Jan" autofocus />
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <label for="lastName" class="text-sm font-semibold">Nazwisko</label>
                    <InputText id="lastName" v-model="localFormData.lastName" placeholder="np. Kowalski" />
                </div>
            </div>
            
            <div class="flex flex-col gap-1">
                <label for="gender" class="text-sm font-semibold">Płeć</label>
                <Select id="gender" v-model="localFormData.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Wybierz płeć" />
            </div>
            
            <div class="flex flex-col gap-1">
                <label for="pb5k" class="text-sm font-semibold">PB (5km)</label>
                <InputText id="pb5k" v-model="localFormData.pb5k" @keydown="blockInvalidChars" @input="formatTime" placeholder="np. 19:45" maxlength="5" />           
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                <Button severity="secondary" @click="$emit('close')">Anuluj</Button>
                <Button @click="$emit('save', localFormData)" :disabled="!isFormValid" :loading="isSubmitting">{{ submitLabel }}</Button>
            </div>
            
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'; 
import Button from 'primevue/button';
import { ref, watch, computed } from 'vue';
import type { GenderOptions } from '../composables/useAddingDialog';
import type { User } from '@/stores/peopleStore'

const blockInvalidChars = (event: KeyboardEvent) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (allowedKeys.includes(event.key)) {
        return;
    }

    if (!/^\d$/.test(event.key)) {
        event.preventDefault();
    }
};

const isFormValid = computed(() => {
    return localFormData.value.firstName.trim().length > 0 && 
           localFormData.value.lastName.trim().length > 0 &&
           localFormData.value.pb5k.trim().length == 5;
});

const props = defineProps<{
    visible: boolean;
    formData: User;
    genderOptions: GenderOptions[]; 
    dialogHeader: string;
    submitLabel: string;
    isSubmitting: boolean;
}>();

const formatTime = () => {
    let val = localFormData.value.pb5k ? localFormData.value.pb5k.replace(/\D/g, '') : '';
    
    if (val.length > 2) {
        val = val.substring(0, 2) + ':' + val.substring(2, 4);
    }
    
    localFormData.value.pb5k = val;
};

defineEmits(['update:visible', 'close', 'save']);

const localFormData = ref<User>({ ...props.formData });

watch(
    () => props.visible,
    (isVisible) => {
        if (isVisible) {
            localFormData.value = { ...props.formData };
        }
    },
    { immediate: true }
);

</script>