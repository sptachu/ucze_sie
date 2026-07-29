<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal :header="dialogHeader" class="w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <div class="flex flex-col gap-4">
            
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-col gap-1 flex-1">
                    <label for="firstName" class="text-sm font-semibold">Imię</label>
                    <InputText id="firstName" v-model="formData.firstName" placeholder="np. Jan" autofocus />
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <label for="lastName" class="text-sm font-semibold">Nazwisko</label>
                    <InputText id="lastName" v-model="formData.lastName" placeholder="np. Kowalski" />
                </div>
            </div>
            
            <div class="flex flex-col gap-1">
                <label for="gender" class="text-sm font-semibold">Płeć</label>
                <Select id="gender" v-model="formData.gender" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Wybierz płeć" />
            </div>
            
            <div class="flex flex-col gap-1">
                <label for="pb5k" class="text-sm font-semibold">PB (5km)</label>
                <InputMask id="pb5k" v-model="formData.pb5k" mask="99:99" placeholder="np. 19:45" />
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                <Button severity="secondary" @click="$emit('close')">Anuluj</Button>
                <Button @click="$emit('save')">{{ submitLabel }}</Button>
            </div>
            
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'; 
import Button from 'primevue/button';
import InputMask from 'primevue/inputmask';

defineProps<{
    visible: boolean;
    formData: any;
    genderOptions: any[];
    dialogHeader: string;
    submitLabel: string;
}>();

defineEmits(['update:visible', 'close', 'save']);


</script>