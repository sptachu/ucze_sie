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
                <label for="dateOfBirth">Data urodzenia</label>
    
            <MyCalendar v-model="rawDate" :is-range="false">
                <template #default="{ inputValue, inputEvents }">
                    <InputText 
                        id="dateOfBirth"
                        :value="inputValue" 
                        v-on="inputEvents" 
                        readonly 
                        placeholder="Wybierz z kalendarza..."
                        class="cursor-pointer bg-white" 
                    />
                </template>
            </MyCalendar>
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
import MyCalendar from '@/features/shared/components/MyCalendar.vue';

const rawDate = ref<Date | null>(null);

const props = defineProps<{
    visible: boolean;
    formData: User;
    genderOptions: GenderOptions[]; 
    dialogHeader: string;
    submitLabel: string;
    isSubmitting: boolean;
}>();



defineEmits(['update:visible', 'close', 'save']);

const localFormData = ref<User>({ ...props.formData });

watch(
    () => props.visible,
    (isVisible) => {
        if (isVisible) {
            localFormData.value = { ...props.formData };
            
            if (props.formData.dateOfBirth) {
                rawDate.value = new Date(props.formData.dateOfBirth);
            } else {
                rawDate.value = null; 
            }
        }
    },
    { immediate: true }
);

watch(rawDate, (newVal) => {
    if (newVal) {
        const year = newVal.getFullYear();
        const month = String(newVal.getMonth() + 1).padStart(2, '0');
        const day = String(newVal.getDate()).padStart(2, '0');
        
        localFormData.value.dateOfBirth = `${year}-${month}-${day}`;
    } else {
        localFormData.value.dateOfBirth = '';
    }
});

const isFormValid = computed(() => {
    return localFormData.value.firstName.trim().length > 0 && 
           localFormData.value.lastName.trim().length > 0 &&
           localFormData.value.dateOfBirth.length === 10; 
});

</script>