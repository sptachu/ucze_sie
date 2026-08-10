<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal :header="dialogHeader" class="w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <div class="flex flex-col gap-4">
            
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-1 flex-1">
                    <label for="resultDate" class="text-sm font-semibold">Data startu</label>
                    <MyCalendar v-model="rawDate" :is-range="false">
                        <template #default="{ inputValue, inputEvents }">
                            <InputText 
                                id="resultDate"
                                :value="inputValue" 
                                v-on="inputEvents" 
                                readonly 
                                placeholder="Wybierz datę..."
                                class="cursor-pointer bg-white" 
                            />
                        </template>
                    </MyCalendar>
                </div>
                
                <div class="flex flex-col gap-1 flex-1">
                    <label for="activityType" class="text-sm font-semibold">Dyscyplina</label>
                    <Select id="activityType" v-model="localFormData.activityType" :options="activityOptions" optionLabel="label" optionValue="value" placeholder="Wybierz..." />
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-1 flex-1">
                    <label for="distance" class="text-sm font-semibold">Dystans</label>
                    <Select 
                        id="distance" 
                        v-model="localFormData.distance" 
                        :options="distanceOptions" 
                        optionLabel="label" 
                        optionValue="value" 
                        placeholder="Wybierz dystans" 
                    />
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <label for="time" class="text-sm font-semibold">Czas</label>
                    <InputText 
                        id="time" 
                        :model-value="localFormData.time" 
                        @update:model-value="formatTime"
                        @keydown="blockInvalidChars"
                        placeholder="np. 45:30 lub 1:25:00" 
                    />
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-1 flex-1">
                    <label for="startLocation" class="text-sm font-semibold">Miejsce startu</label>
                    <InputText id="startLocation" v-model="localFormData.startLocation" placeholder="np. Kraków" />
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <label for="endLocation" class="text-sm font-semibold">Miejsce mety</label>
                    <InputText id="endLocation" v-model="localFormData.endLocation" placeholder="np. Kraków" />
                </div>
            </div>

            <div class="flex flex-col gap-1">
                <label for="equipment" class="text-sm font-semibold">Sprzęt (opcjonalnie)</label>
                <InputText id="equipment" v-model="localFormData.equipment" placeholder="np. Buty Nike, Rower Trek" />
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <Button severity="secondary" @click="$emit('close')">Anuluj</Button>
                <Button @click="handleSave" :disabled="!isFormValid" :loading="isSubmitting">{{ submitLabel }}</Button>
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
import type { ActivityOptions, DistanceOptions } from '../composables/useAddingResultDialog';
import { ResultRecord } from '@/stores/resultsStore';
import MyCalendar from '@/features/shared/components/MyCalendar.vue';

const props = defineProps<{
    visible: boolean;
    formData: ResultRecord;
    activityOptions: ActivityOptions[]; 
    distanceOptions: DistanceOptions[];
    dialogHeader: string;
    submitLabel: string;
    isSubmitting: boolean;
}>();

const emit = defineEmits(['update:visible', 'close', 'save']);


const localFormData = ref<ResultRecord>({ ...props.formData });
const rawDate = ref<Date | null>(null);

watch(
    () => props.visible,
    (isVisible) => {
        if (isVisible) {
            localFormData.value = { ...props.formData };
            if (props.formData.date) {
                rawDate.value = new Date(props.formData.date);
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
        localFormData.value.date = `${year}-${month}-${day}`;
    } else {
        localFormData.value.date = '';
    }
});

const isFormValid = computed(() => {
    return localFormData.value.date.length === 10 && 
           localFormData.value.activityType &&
           localFormData.value.distance.trim().length > 0 &&
           localFormData.value.time.trim().length > 0;
});

const formatTime = (value: string | undefined) => {
    if (!value) {
        localFormData.value.time = '';
        return;
    }

    let rawValue = value.replace(/\D/g, '');
        rawValue = rawValue.slice(0, 6);

    let formatted = rawValue;
    
    if (rawValue.length > 4) {
        formatted = `${rawValue.slice(0, -4)}:${rawValue.slice(-4, -2)}:${rawValue.slice(-2)}`;
    } else if (rawValue.length > 2) {
        formatted = `${rawValue.slice(0, -2)}:${rawValue.slice(-2)}`;
    }
    
    localFormData.value.time = formatted;
};

const blockInvalidChars = (event: KeyboardEvent) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    
    if (allowedKeys.includes(event.key)) {
        return;
    }

    if (!/^\d$/.test(event.key)) {
        event.preventDefault();
    }
};

const handleSave = () => {
    const timeStr = localFormData.value.time;
    
    if (timeStr) {
        const rawValue = timeStr.replace(/\D/g, '');
        let sec = 0, min = 0, hr = 0;

        if (rawValue.length <= 2) {
            sec = parseInt(rawValue, 10) || 0;
        } else if (rawValue.length <= 4) {
            sec = parseInt(rawValue.slice(-2), 10) || 0;
            min = parseInt(rawValue.slice(0, -2), 10) || 0;
        } else {
            sec = parseInt(rawValue.slice(-2), 10) || 0;
            min = parseInt(rawValue.slice(-4, -2), 10) || 0;
            hr = parseInt(rawValue.slice(0, -4), 10) || 0;
        }

        if (sec >= 60) {
            min += Math.floor(sec / 60);
            sec = sec % 60;
        }
        if (min >= 60) {
            hr += Math.floor(min / 60);
            min = min % 60;
        }
        if (hr > 99) hr = 99;

        let newRaw = '';
        if (hr > 0 || rawValue.length > 4) {
            newRaw = hr.toString() + min.toString().padStart(2, '0') + sec.toString().padStart(2, '0');
        } else if (min > 0 || rawValue.length > 2) {
            newRaw = min.toString() + sec.toString().padStart(2, '0');
        } else {
            newRaw = sec.toString();
        }

        let formatted = newRaw;
        if (newRaw.length > 4) {
            formatted = `${newRaw.slice(0, -4)}:${newRaw.slice(-4, -2)}:${newRaw.slice(-2)}`;
        } else if (newRaw.length > 2) {
            formatted = `${newRaw.slice(0, -2)}:${newRaw.slice(-2)}`;
        }
        
        localFormData.value.time = formatted;
    }
    emit('save', localFormData.value);
}
</script>